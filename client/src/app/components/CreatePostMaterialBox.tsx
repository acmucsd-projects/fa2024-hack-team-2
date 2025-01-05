import React, { useState } from "react";

interface MyComponentProps {
  name: string;
  onChange: (value: Record<string, number>) => void;
}

const CreatePostMaterialBox: React.FC<MyComponentProps> = ({
  name,
  onChange,
}) => {
  const options = [
    "Acetate",
    "Alpaca",
    "Angora",
    "Aramid Fiber",
    "Bamboo",
    "Batiste",
    "Batik",
    "Bouclé",
    "Broadcloth",
    "Canvas",
    "Canvas Duck",
    "Carbon Fiber",
    "Cashmere",
    "Chambray",
    "Charmeuse",
    "Chiffon",
    "Corduroy",
    "Cork Fabric",
    "Cotton",
    "Crinoline",
    "Crepe",
    "Cupro",
    "Denim",
    "Drill",
    "Dupioni",
    "Elastane",
    "Faux Leather",
    "Flannel",
    "Fleece",
    "Gabardine",
    "Georgette",
    "Gingham",
    "Gore-Tex",
    "Graphene Fabric",
    "Hemp",
    "Herringbone",
    "Ikats",
    "Interlock",
    "Jacquard",
    "Jersey",
    "Kevlar",
    "Kente Cloth",
    "Lace",
    "Leather",
    "Linen",
    "Llama Wool",
    "Lyocell",
    "Lyra",
    "Merino Wool",
    "Mesh",
    "Metallic Fabric",
    "Microfiber",
    "Milk Fiber",
    "Mohair",
    "Modal",
    "Muslin",
    "Neoprene",
    "Netting",
    "Nomex",
    "Nonwoven Fabric",
    "Nylon",
    "Organza",
    "Pashmina",
    "Photochromic Fabric",
    "Piqué",
    "Plaid",
    "Polyester",
    "Polypropylene",
    "Polyurethane",
    "Poplin",
    "Raffia",
    "Rayon",
    "Recycled Polyester",
    "Rib Knit",
    "Satin",
    "Seersucker",
    "Shantung",
    "Silicone-Coated Fabric",
    "Silk",
    "Soy Fabric",
    "Spandex",
    "Spider Silk",
    "Sued",
    "Tartan",
    "Tencel",
    "Terrycloth",
    "Thermochromic Fabric",
    "Tulle",
    "Tweed",
    "Tyvek",
    "Velour",
    "Velvet",
    "Viscose",
    "Wool",
  ];

  const [rows, setRows] = useState<{ percentage: number; material: string }[]>([
    { percentage: 0, material: "" },
  ]);

  const updateParent = (
    updatedRows: { percentage: number; material: string }[],
  ) => {
    const hashmap: Record<string, number> = {};
    updatedRows.forEach((row) => {
      if (row.material) {
        hashmap[row.material] = row.percentage;
      }
    });
    onChange(hashmap);
  };

  const handleRowChange = (
    index: number,
    field: "percentage" | "material",
    value: string | number,
  ) => {
    const updatedRows = [...rows];
    if (field === "percentage") {
      const newPercentage = Math.min(Math.max(0, Number(value)), 100); // Clamp value to 0–100
      const totalPercentage = rows.reduce(
        (sum, row, i) => sum + (i === index ? newPercentage : row.percentage),
        0,
      );
      if (totalPercentage <= 100) {
        updatedRows[index].percentage = newPercentage;
      }
    } else if (field === "material") {
      const selectedMaterial = value as string;
      if (
        rows.some((row, i) => i !== index && row.material === selectedMaterial)
      ) {
        alert(`Material "${selectedMaterial}" is already selected.`);
        return;
      }
      updatedRows[index].material = selectedMaterial;
    }
    setRows(updatedRows);
    updateParent(updatedRows); // Notify parent with hashmap
  };

  const handleAddRow = () => {
    if (rows.reduce((sum, row) => sum + row.percentage, 0) < 100) {
      const newRows = [...rows, { percentage: 0, material: "" }];
      setRows(newRows);
      updateParent(newRows); // Notify parent with hashmap
    }
  };

  const totalPercentage = rows.reduce((sum, row) => sum + row.percentage, 0);

  return (
    <div className={`relative ${totalPercentage === 100 ? "" : "mb-8"}`}>
      <span className="mt-2 flex max-h-36 flex-col overflow-y-scroll rounded border px-2">
        <label
          htmlFor={name}
          className="mb-0 mt-2 text-left font-bold text-gray-600"
        >
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </label>
        {rows.map((row, index) => (
          <span key={index} className="mt-2 flex flex-row gap-2">
            <input
              type="number"
              className="w-14 rounded-md p-2 outline-none drop-shadow transition-all focus:outline-blue-200 focus:drop-shadow-none"
              placeholder="0%"
              value={row.percentage || ""}
              onChange={(e) =>
                handleRowChange(index, "percentage", e.target.value)
              }
              min="0"
              max="100"
            />
            <select
              name={`${name}-${index}`}
              className="w-full rounded-md p-2 outline-none drop-shadow transition-all focus:outline-blue-200 focus:drop-shadow-none"
              value={row.material}
              onChange={(e) =>
                handleRowChange(index, "material", e.target.value)
              }
            >
              <option value="" disabled>
                Select a material
              </option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </span>
        ))}
        <p
          className="mb-1 mt-2 cursor-pointer text-left text-sm text-blue-500 transition-all hover:text-blue-400"
          onClick={handleAddRow}
        >
          + Add another material
        </p>
      </span>
      {totalPercentage < 100 && (
        <p className="absolute left-0 top-full mt-2 text-sm text-red-500">
          Percentages must add up to 100%
        </p>
      )}
    </div>
  );
};

export default CreatePostMaterialBox;
