import React, {useEffect, useState} from "react";
import "./index.css";

export default function ResponsiveTable(props) {
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
  return (React.createElement("div", {
    className: [
      "SiliconResponsiveTable",
      props.wrapperClassName
    ].filter(Boolean).join(" ")
  }, desktop ? (React.createElement("table", {className: `silicon-table ${props.desktopTableClassName ?? ""}`},
    React.createElement("thead", null,
      React.createElement(
        "tr",
        null,
        props.headers.map((header, i) => (React.createElement("th", {key: `${header}-${i}`}, header)))
      )
    ),
    React.createElement(
      "tbody",
      null,
      props.rows.map((row, i) => (React.createElement("tr",
        {key: `${i}`, className: props.onRowClick ? "isHoverable" : "", onClick: () => props.onRowClick?.(i)},
        row.map((cell, i) => (React.createElement("td", {key: i}, cell)))
      )))
    )
  )) : (React.createElement(
    "div",
    {className: props.mobileCellsClassName},
    props.rows.map((row, i) => (React.createElement("div", {
        key: i, className: [
          ...(props.mobileCellClassName ? [props.mobileCellClassName] : []),
          ...(props.onRowClick ? ["_isHoverable"] : [])
        ].join(" "), onClick: () => props.onRowClick?.(i)
      },
      React.createElement(
        "div",
        {className: props.dataRowsClassName},
        row.map((cell, i) => (React.createElement("div", {key: i, className: props.dataRowClassName},
          React.createElement("div", null,
            props.headers[i],
            ":"
          ),
          React.createElement("div", null, cell)
        )))
      )
    )))
  ))));
}
//# sourceMappingURL=index.js.map
