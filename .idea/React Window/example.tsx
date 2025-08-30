import './App.css';

import {List, type RowComponentProps} from "react-window";

function Row({ index, style, names }: RowComponentProps<{
    names: string[];
}>) {
    return (
        <div className="flex items-center justify-between" style={style}>
            <span className="text-white">{names[index]}</span>
            <div className="text-slate-500 text-xs">
                {`${index + 1} of ${names.length}`}
            </div>
        </div>
    );
}

function Example({ names }: { names: string[] }) {
    return (
        <List
            className='max-h-[300px]'
            rowComponent={Row}
            rowCount={names.length}
            rowHeight={25}
            rowProps={{ names }}
        />
    );
}

export default function App() {
    return (
        <div className="w-full h-full">
            <Example names={Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`)} />
        </div>
    );
}
