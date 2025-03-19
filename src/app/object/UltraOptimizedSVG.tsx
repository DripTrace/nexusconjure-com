"use client";

// components/UltraOptimizedSVG.tsx
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const UltraOptimizedSVG: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Create scene, camera, and renderer
        const scene = new THREE.Scene();
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        );
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        mountRef.current.appendChild(renderer.domElement);

        // Load the SVG texture (place your svg file in public folder, e.g., /my-texture.svg)
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
            "/my-texture.svg",
            (texture) => {
                // Ensure texture is updated after loading
                texture.needsUpdate = true;

                // Create a sphere geometry with many segments for smooth mapping
                const sphereGeometry = new THREE.SphereGeometry(2, 64, 64);
                const sphereMaterial = new THREE.MeshBasicMaterial({
                    map: texture,
                });
                const sphereMesh = new THREE.Mesh(
                    sphereGeometry,
                    sphereMaterial
                );
                scene.add(sphereMesh);

                // Animation loop: update sphere rotation and render the scene
                const animate = () => {
                    requestAnimationFrame(animate);
                    sphereMesh.rotation.y += 0.01;
                    renderer.render(scene, camera);
                };
                animate();
            },
            undefined,
            (error) => {
                console.error("Error loading texture:", error);
            }
        );

        // Resize handling for responsiveness
        const handleResize = () => {
            if (mountRef.current) {
                const width = mountRef.current.clientWidth;
                const height = mountRef.current.clientHeight;
                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            }
        };
        window.addEventListener("resize", handleResize);

        // Cleanup on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                width: "100%",
                height: "100vh",
                overflow: "hidden",
                background: "#000",
            }}
        />
    );
};

export default UltraOptimizedSVG;
