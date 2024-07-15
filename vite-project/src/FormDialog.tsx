type Props = {
  text: string;
  onSubmit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormDialog = ({ text, onSubmit, onChange }: Props) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }}
  >
    <input type="text" value={text} onChange={onChange} />
    <input type="submit" value="追加" onSubmit={onSubmit} />
  </form>
);
