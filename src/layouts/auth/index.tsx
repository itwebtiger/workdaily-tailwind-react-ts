import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import routes from "routes";
import authImg from "assets/img/dashboards/Debit.png";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";

export default function Auth() {
  const canvasRef = useRef();
  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };
  document.documentElement.dir = "ltr";

  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 500 * 2,
      height: 500 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.9, 0.9, 0.9],
      markerColor: [0.9, 0.1, 1],
      glowColor: [0.1, 0.1, 0.1],
      markers: [{ location: [40.7128, -74.006], size: 0.1 }],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.003;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-darkPrimary">
        <FixedPlugin />
        <main className={`mx-auto min-h-screen`}>
          <div className="relative flex">
            <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:px-0">
              <div className="mb-auto flex flex-col pl-5 pr-5 md:pl-12 md:pr-0 lg:max-w-[48%] lg:pl-0 xl:max-w-full relative">
                <Routes>
                  {getRoutes(routes)}
                  <Route
                    path="/"
                    element={<Navigate to="/auth/sign-in" replace />}
                  />
                </Routes>
                <div className="absolute right-0 hidden h-full min-h-screen md:block w-3/5">
                  <div
                    className="absolute flex h-full w-full items-center justify-center bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]"
                    // style={{ backgroundImage: `url(${authImg})` }}
                  >
                    <div className="flex flex-col items-center">
                      <canvas
                        ref={canvasRef}
                        style={{
                          width: 500,
                          height: 500,
                          maxWidth: "100%",
                          aspectRatio: 55.1,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
