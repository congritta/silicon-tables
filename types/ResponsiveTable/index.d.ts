import React, {ReactNode} from "react";
import "./index.css";

export default function ResponsiveTable(props: {
  headers: string[];
  rows: ReactNode[][];
  mediaWidth: number;
  onRowClick?(rowIndex: number): void;
  wrapperClassName?: string;
  desktopTableClassName?: string;
  mobileCellsClassName?: string;
  mobileCellClassName?: string;
  dataRowsClassName?: string;
  dataRowClassName?: string;
}): React.JSX.Element;
