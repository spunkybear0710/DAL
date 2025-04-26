
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface AdvocateSearchProps {
  onSearch: (query: string) => void;
}

const AdvocateSearch = ({ onSearch }: AdvocateSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-3xl">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          type="text"
          placeholder="Search by name, specialization, or location..."
          className="pl-10 pr-4 py-2 h-12 rounded-l-md border-r-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Button type="submit" className="rounded-l-none h-12 px-6">
        Search
      </Button>
    </form>
  );
};

export default AdvocateSearch;
