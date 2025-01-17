import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchSortFilterProps {
  debouncedSearchTerm: string;
  setDebouncedSearchTerm: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
}

const SearchSortFilter: React.FC<SearchSortFilterProps> = ({
  setDebouncedSearchTerm,
  sort,
  setSort,
  priceRange,
  setPriceRange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [localPriceRange, setLocalPriceRange] =
    useState<[number, number]>(priceRange);

  // Handle search term debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, setDebouncedSearchTerm]);

  // Handle price range debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPriceRange(localPriceRange);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [localPriceRange, setPriceRange]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setSort("");
    setLocalPriceRange([0, 0]);
    setPriceRange([0, 0]);
  };

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 border rounded-lg bg-card">
      <Input
        className="flex-1 min-w-[200px]"
        type="text"
        placeholder="Search services..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Select value={sort} onValueChange={setSort}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="price">Price (Low to High)</SelectItem>
          <SelectItem value="-price">Price (High to Low)</SelectItem>
          <SelectItem value="duration">Duration (Short to Long)</SelectItem>
          <SelectItem value="-duration">Duration (Long to Short)</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        onClick={handleClearFilters}
        className="whitespace-nowrap"
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default SearchSortFilter;
