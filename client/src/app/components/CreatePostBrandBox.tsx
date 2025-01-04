interface MyComponentProps {
  name: string;
  onChange: (value: string) => void;
}

const CreatePostBrandBox: React.FC<MyComponentProps> = ({ name, onChange }) => {
  const options = [
    "Abercrombie & Fitch",
    "Adidas",
    "Aeropostale",
    "Alexander McQueen",
    "American Eagle",
    "Anne Klein",
    "Armani",
    "Balenciaga",
    "Banana Republic",
    "Bally",
    "Barbour",
    "Benetton",
    "Billabong",
    "Bottega Veneta",
    "Brooks Brothers",
    "Burberry",
    "Calvin Klein",
    "Carhartt",
    "Champion",
    "Chanel",
    "Christian Dior",
    "Coach",
    "Columbia",
    "Converse",
    "Diesel",
    "DKNY",
    "Dolce & Gabbana",
    "Dr. Martens",
    "Fendi",
    "Forever 21",
    "Fred Perry",
    "Free People",
    "Gap",
    "Giorgio Armani",
    "Givenchy",
    "Gucci",
    "Guess",
    "H&M",
    "Hermès",
    "Hollister",
    "Hugo Boss",
    "Hurley",
    "J.Crew",
    "Jack & Jones",
    "Jil Sander",
    "Jimmy Choo",
    "Joe Fresh",
    "Kate Spade",
    "Kenzo",
    "Kiton",
    "L.L.Bean",
    "Lacoste",
    "Levi's",
    "Loro Piana",
    "Louis Vuitton",
    "Lululemon",
    "Mango",
    "Marc Jacobs",
    "Michael Kors",
    "Missoni",
    "Moncler",
    "New Balance",
    "Nike",
    "North Face",
    "Off-White",
    "Patagonia",
    "Paul Smith",
    "Pierre Cardin",
    "Polo Ralph Lauren",
    "Prada",
    "Puma",
    "Quiksilver",
    "Reebok",
    "Reformation",
    "Rick Owens",
    "Roxy",
    "Saks Fifth Avenue",
    "Saint Laurent",
    "Salvatore Ferragamo",
    "Shein",
    "Stone Island",
    "Supreme",
    "Ted Baker",
    "Theory",
    "Thom Browne",
    "Timberland",
    "Todd Snyder",
    "Tom Ford",
    "Tommy Hilfiger",
    "Topshop",
    "Tory Burch",
    "Under Armour",
    "Uniqlo",
    "Urban Outfitters",
    "Valentino",
    "Vans",
    "Versace",
    "Victoria's Secret",
    "Vineyard Vines",
    "Yeezy",
    "Zara",
    "Zegna",
  ];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onChange(selectedValue); // Notify the parent of the selected value
  };

  return (
    <>
      <label
        htmlFor={name}
        className="mb-1 mt-2 text-left font-bold text-gray-600"
      >
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <select
        name={name}
        id={name}
        className="w-full rounded-md p-2 outline-none drop-shadow transition-all focus:outline-blue-200 focus:drop-shadow-none"
        onChange={handleChange}
        defaultValue=""
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

export default CreatePostBrandBox;
