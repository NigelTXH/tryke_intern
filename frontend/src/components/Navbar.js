import React from "react";
import "./Navbar.css"
import Table from "../pages/Table/Table.js";
import Dashboard from "../pages/Dashboard.js";
import MapPage from "../pages/Map.js";
import { useState } from "react";

function renderPage(page) {
    switch (page) {
        case "table":
            return <Table />;

        case "map":
            return <MapPage />;

        case "dashboard":
        default:
            return <Dashboard />;
    }
}

export default function Navbar() {
    const [page, setPage] = useState("dashboard")
    return (
        <>
            <nav>
                <button onClick={() => setPage("dashboard")}>
                    Dashboard
                </button>

                <button onClick={() => setPage("table")}>
                    Table
                </button>

                <button onClick={() => setPage("map")}>
                    Map
                </button>
            </nav>

            {renderPage(page)}
        </>

    );
}