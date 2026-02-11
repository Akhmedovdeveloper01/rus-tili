import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import bookPdf from "../assets/book/book.pdf";
export default function Home() {
    return (
        <div>
            <div style={{ width: "100%", height: "85vh", margin: "0 auto" }}>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <Viewer fileUrl={bookPdf} />
                </Worker>
            </div>
        </div>
    );
}
