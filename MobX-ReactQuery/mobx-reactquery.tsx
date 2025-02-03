class MobxQuery<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey
> {
    private atom = createAtom(
        "MobxQuery",
        () => this.startTracking(),
        () => this.stopTracking()
    );

    private queryObserver = new QueryObserver(
        this.queryClient,
        this.defaultQueryOptions
    )

    constructor(
        private getOptions: () => QueryObserverOptions<
            TQueryFnData,
            TError,
            TData,
            TQueryData,
            TQueryKey
        >,
        private queryClient: QueryClient
    ){}

    get result() {
        this.atom.reportObserved();

        this.queryObserver.setOptions(this.defaultQueryOptions);

        return this.queryObserver.getOptimisticResult(this.defaultQueryOptions)
    }

    get data() {
        const data = this.result.data;

        if(!data) {
            throw this.queryObserver.fetchOptimistic(this.defaultQueryOptions)
        }

        return data;
    }

    private unsubscribe = () => {}

    private startTracking() {
        const unsubscribeReaction = reaction(
            () => this.defaultQueryOptions,
            () => {
                this.queryObserver.setOptions(this.defaultQueryOptions);
            }
        )

        const unsubscribeObserver = this.queryObserver.subscribe(() => {
            this.atom.reportChanged();
        })

        this.unsubscribe = () => {
            unsubscribeReaction();
            unsubscribeObserver();
        }
    }

    private stopTracking() {
        this.unsubscribe();
    }

    private get defaultQueryOptions() {
        return this.queryClient.defaultQueryOptions(this.getOptions());
    }
}

class QueryStore {
    q = "";

    constructor() {
        makeAutoObservable(this);
    }

    setQuery(q: string) {
        this.q = q;
    }
}

const queryStore = new QueryStore();

class UserStore {
    usersQuery = new MobxQuery(() => ({
        queryKey: ["users", queryStore.q],
        queryFn: () => fetch(`/api/users?na=${queryStore.q}`).then((res) => res.json())
    }), queryClient);

    constructor() {
        makeAutoObservable(this);
    }

    get filteredUsers() {
        return this.usersQuery.result.data;
    }
}
