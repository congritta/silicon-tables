import React, {ReactNode, useEffect, useState} from "react";

import "./index.css";

export default function ResponsiveTable(props: {
  headers: string[],
  rows: ReactNode[][],

  mediaWidth: number,

  onRowClick?(rowIndex: number): void,

  wrapperClassName?: string,
  desktopTableClassName?: string,
  mobileCellsClassName?: string,
  mobileCellClassName?: string,
  dataRowsClassName?: string,
  dataRowClassName?: string
}) {

  // State
  const [desktop, setDesktop] = useState(window.innerWidth >= props.mediaWidth);

  // Switch tables on actual window width function
  function switchTables() {
    setDesktop(window.innerWidth >= props.mediaWidth);
  }

  // Watch media width
  useEffect(() => {
    switchTables();
  }, [props.mediaWidth]);

  // Watch window width
  useEffect(() => {
    window.addEventListener("resize", switchTables);

    return () => {
      window.removeEventListener("resize", switchTables);
    };
  }, []);

  // Render
  return (
    <div
      className={[
        "SiliconResponsiveTable",
        props.wrapperClassName
      ].filter(Boolean).join(" ")}
    >
      {desktop ? (
        <table className={`silicon-table ${props.desktopTableClassName ?? ""}`}>
          <thead>
            <tr>
              {props.headers.map((header, i) => (
                <th key={`${header}-${i}`}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.rows.map((row, i) => (
              <tr
                key={`${i}`}
                className={props.onRowClick ? "isHoverable" : ""}
                onClick={() => props.onRowClick?.(i)}
              >
                {row.map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={props.mobileCellsClassName}>
          {props.rows.map((row, i) => (
            <div
              key={i}
              className={[
                ...(props.mobileCellClassName ? [props.mobileCellClassName] : []),
                ...(props.onRowClick ? ["_isHoverable"] : [])
              ].join(" ")}
              onClick={() => props.onRowClick?.(i)}
            >
              <div className={props.dataRowsClassName}>
                {row.map((cell, i) => (
                  <div key={i} className={props.dataRowClassName}>
                    <div>{props.headers[i]}:</div>
                    <div>{cell}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
