import {
    DataGrid,
    GridColDef,
    GridToolbar,
} from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
    columns: GridColDef[]; // Columns configuration
    rows: object[]; // Data rows to display
    deleteEndpoint?: (id: number) => string; // Function to determine delete API endpoint
    detailPath?: (id: number) => string; // Function to determine detail page path
    authToken?: string; // Authorization token
};

const DataTableV1 = ({
                         columns,
                         rows,
                         deleteEndpoint,
                         detailPath,
                         authToken,
                     }: Props) => {
    const queryClient = useQueryClient();

    // Mutation for delete
    const mutation = useMutation({
        mutationFn: (id: number) => {
            if (!deleteEndpoint) {
                throw new Error("Delete endpoint is not provided.");
            }
            return fetch(deleteEndpoint(id), {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
    });

    const handleDelete = (id: number) => {
        mutation.mutate(id);
    };

    const actionColumn: GridColDef = {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => (
            <div className="action">
                {detailPath && (
                    <Link to={detailPath(params.row.id)}>
                        <img src="/view.svg" alt="View" />
                    </Link>
                )}
                {deleteEndpoint && authToken && (
                    <div className="delete" onClick={() => handleDelete(params.row.id)}>
                        <img src="/delete.svg" alt="Delete" />
                    </div>
                )}
            </div>
        ),
    };

    return (
        <div className="dataTable">
            <DataGrid
                className="dataGrid"
                rows={rows}
                columns={[...columns, actionColumn]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
                disableColumnFilter
                disableDensitySelector
                disableColumnSelector
            />
        </div>
    );
};

export default DataTableV1;