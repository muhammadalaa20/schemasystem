const CategorySelect = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="PC">PC</option>
      <option value="Printer">Printer</option>
      <option value="VM3">VM3</option>
      <option value="PDA">PDA</option>
      <option value="RDT">RDT</option>
      <option value="Network">Network</option>
      <option value="OCR">OCR</option>
      <option value="ERP">ERP</option>
      <option value="CATOS">CATOS</option>
      <option value="EDI">EDI</option>
    </select>
  );
};

export default CategorySelect;
