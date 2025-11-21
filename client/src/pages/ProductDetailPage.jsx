// client/src/pages/ProductDetailPage.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

// ✅ Read environment variable correctly (Vite requires VITE_* prefix)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

console.log("🔧 FRONTEND API URL =", API_URL);

// ✅ Axios instance using .env
const api = axios.create({
    baseURL: API_URL,
});

/**
 * ProductDetailPage
 * - Fetches GET /api/products/first on mount
 * - Displays product instantly when returned
 */
export default function ProductDetailPage() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        let mounted = true;

        const fetchFirst = async () => {
            try {
                const res = await api.get("/api/products/first");
                if (!mounted) return;
                setProduct(res.data);
            } catch (error) {
                console.error("Failed to fetch first product:", error);
                setErr(error?.response?.data?.message || error.message || "Failed to load");
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchFirst();
        return () => {
            mounted = false;
        };
    }, []);

    if (loading) return <div>Loading product…</div>;
    if (err) return <div style={{ color: "red" }}>Error: {err}</div>;
    if (!product) return <div>No product found.</div>;

    const firstImage =
        Array.isArray(product.image) && product.image.length > 0 ? product.image[0] : null;

    return (
        <div style={{ padding: 20, maxWidth: 900 }}>
            <h1>Product detail (first product) to show preview number 3</h1>

            <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div style={{ flex: "0 0 420px" }}>
                    {firstImage ? (
                        <img
                            src={firstImage}
                            alt={product.name}
                            style={{ width: "100%", maxWidth: 400, borderRadius: 8 }}
                        />
                    ) : (
                        <div
                            style={{
                                width: 400,
                                height: 300,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "#f2f2f2",
                            }}
                        >
                            No image
                        </div>
                    )}
                </div>

                <div style={{ flex: 1 }}>
                    <h2>{product.name}</h2>

                    <p style={{ fontSize: 20, margin: "8px 0" }}>
                        <strong>Price:</strong> {product.price ?? "—"}
                    </p>

                    <p>
                        <strong>Unit:</strong> {product.unit || "—"}
                    </p>

                    <p>
                        <strong>Stock:</strong> {product.stock ?? "—"}
                    </p>

                    <p style={{ marginTop: 12 }}>{product.description}</p>

                    {product.more_details &&
                        Object.keys(product.more_details).length > 0 && (
                            <div style={{ marginTop: 12 }}>
                                <h4>More details</h4>
                                <pre style={{ background: "#fafafa", padding: 8 }}>
                                    {JSON.stringify(product.more_details, null, 2)}
                                </pre>
                            </div>
                        )}
                </div>
            </div>

            <hr style={{ margin: "24px 0" }} />
            <h4>Raw product JSON (debug)</h4>
            <pre style={{ background: "#f9f9f9", padding: 12 }}>
                {JSON.stringify(product, null, 2)}
            </pre>
        </div>
    );
}
