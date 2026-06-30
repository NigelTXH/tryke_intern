import { formatValue } from "../../utils/utils";

function DataTable({ data }) {

    const columns =
        data.length > 0
            ? Object.keys(data[0])
            : [];

    return (
        <table border="1" cellPadding="8">

            <thead>
                <tr>
                    {columns.map(col => (
                        <th key={col}>
                            {col}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>

                {data.map((row, i) => (

                    <tr key={row.id || i}>

                        {columns.map(col => (

                            <td key={col}>
                                {String(formatValue(col, row[col]))}
                            </td>

                        ))}

                    </tr>

                ))}

            </tbody>

        </table>
    );
}

export default DataTable;