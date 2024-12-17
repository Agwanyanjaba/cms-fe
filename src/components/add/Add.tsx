import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (formData: Record<string, string | undefined>) => void;
};

const Add = (props: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data: Record<string, string | undefined> = {};
    formData.forEach((value, key) => {
      data[key] = value ? value.toString() : undefined;
    });

    props.onSubmit(data);
    props.setOpen(false);
  };

  return (
      <div className="add">
        <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
          <h1>Add new {props.slug}</h1>
          <form onSubmit={handleSubmit}>
            {props.columns
                .filter((item) => item.field !== "id" && item.field !== "img")
                .map((column) => (
                    <div className="item" key={column.field}>
                      <label>{column.headerName}</label>
                      <input
                          name={column.field}
                          type={column.type === "number" ? "number" : "text"}
                          placeholder={column.headerName}
                          required
                      />
                    </div>
                ))}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
  );
};

export default Add;
