import { Plane, Torus } from "@react-three/drei";
import { Canvas, type ThreeEvent } from "@react-three/fiber";
import { createXRStore, XR } from "@react-three/xr";
import { useState } from "react";
import type { Vector3 } from "three";

const store = createXRStore();

function App() {
  const [torusPosition, setTorusPosition] = useState<Vector3 | null>(null);

  const handleMove = (event: ThreeEvent<PointerEvent>) => {
    setTorusPosition(event.point);
  };

  return (
    <main className="w-[100vw] h-[100vh] bg-gray-50">
      <Canvas>
        <XR store={store}>
          <ambientLight />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <Plane
            args={[10, 10]}
            rotation-x={-Math.PI / 2}
            position={[0, -1, 0]}
            onPointerMove={handleMove}
          >
            <meshStandardMaterial />
          </Plane>
          {torusPosition && (
            <Torus
              key={torusPosition.toArray().join(",")}
              position={torusPosition}
              args={[0.3, 0.1, 16, 100]}
              rotation={[Math.PI / 2, 0, 0]}
            />
          )}
        </XR>
      </Canvas>
    </main>
  );
}

export default App;
