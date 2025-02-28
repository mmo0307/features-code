
#Responsive Component
// components/ResponsiveLoader.tsx
"use client";

import React, { useState, useEffect } from 'react';

// Типы для функций динамического импорта
type AsyncDesktopImport<TDesktop> = () => Promise<{ default: React.ComponentType<TDesktop> }>;
type AsyncMobileImport<TMobile> = () => Promise<{ default: React.ComponentType<TMobile> }>;

// Интерфейс пропсов для ResponsiveLoader с разделением пропсов для десктопной и мобильной версий
export interface ResponsiveLoaderProps<TDesktop, TMobile> {
  desktopImport?: AsyncDesktopImport<TDesktop>;
  mobileImport?: AsyncMobileImport<TMobile>;
  minWidth?: number;
  fallback?: React.ReactNode;
  desktopProps?: TDesktop;
  mobileProps?: TMobile;
}

function ResponsiveLoader<TDesktop, TMobile>({
  desktopImport,
  mobileImport,
  minWidth = 1024,
  fallback = <div>Loading...</div>,
  desktopProps,
  mobileProps,
}: ResponsiveLoaderProps<TDesktop, TMobile>): JSX.Element {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadComponent = async () => {
        if (window.innerWidth >= minWidth && desktopImport) {
          const { default: DesktopComponent } = await desktopImport();
          setComponent(() => DesktopComponent);
          setIsDesktop(true);
        } else if (mobileImport) {
          const { default: MobileComponent } = await mobileImport();
          setComponent(() => MobileComponent);
          setIsDesktop(false);
        }
      };

      loadComponent();
    }
  }, [desktopImport, mobileImport, minWidth]);

  if (!Component) return <>{fallback}</>;

  return isDesktop ? <Component {...desktopProps} /> : <Component {...mobileProps} />;
}

export default ResponsiveLoader;


##Used component in page 
// pages/index.tsx
import ResponsiveLoader from '../components/ResponsiveLoader';

// Определите интерфейсы пропсов для десктопного и мобильного компонентов
interface DesktopProps {
  title: string;
  content: string;
}

interface MobileProps {
  title: string;
  content: string;
  subtitle: string;
}

export default function Home() {
  return (
    <ResponsiveLoader<DesktopProps, MobileProps>
      desktopImport={() => import('../components/DesktopComponent')}
      mobileImport={() => import('../components/MobileComponent')}
      minWidth={1024}
      desktopProps={{ title: "Desktop Title", content: "Desktop Content" }}
      mobileProps={{ title: "Mobile Title", content: "Mobile Content", subtitle: "Mobile Subtitle" }}
      fallback={<div>Loading...</div>}
    />
  );
}

