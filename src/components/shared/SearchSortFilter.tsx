
import { useState } from "react";
import debounce from "lodash.debounce";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchSortFilterProps {}

const SearchSortFilter: React.FC<SearchSortFilterProps> = ({}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sort, setSort] = useState("");



  return (
    <div className="flex  items-center gap-4 p-4 border rounded-lg bg-card">
      <Input
        className="flex-1 min-w-[200px]"
        type="text"
        placeholder="Search services..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      
      <Select>
        <SelectTrigger className="w-[180px] ">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price">Price (Low to High)</SelectItem>
          <SelectItem value="-price">Price (High to Low)</SelectItem>
          <SelectItem value="duration">Duration (Short to Long)</SelectItem>
          <SelectItem value="-duration">Duration (Long to Short)</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex items-center gap-2 min-w-[200px] ">
        <span className="text-sm text-muted-foreground">${priceRange[0]}</span>
        <Slider
          className="w-full"
          min={0}
          max={500}
          step={10}
          value={priceRange}
        />
        <span className="text-sm text-muted-foreground">${priceRange[1]}</span>
      </div>
    </div>
  );
};

export default SearchSortFilter;
