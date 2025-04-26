
import { useState } from "react";
import { SearchFilters } from "@/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Filter, X } from "lucide-react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { courtOptions, caseTypeOptions, languageOptions, locationOptions } from "@/data/advocatesData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AdvocateFiltersProps {
  onApplyFilters: (filters: SearchFilters) => void;
}

const initialFilters: SearchFilters = {
  caseType: [],
  court: [],
  location: "",
  language: [],
  gender: "",
  feeRange: { min: 0, max: 10000 },
  rating: 0,
  verified: false,
};

const AdvocateFilters = ({ onApplyFilters }: AdvocateFiltersProps) => {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleCheckboxChange = (category: keyof SearchFilters, value: string) => {
    if (category === 'caseType' || category === 'court' || category === 'language') {
      setFilters(prev => {
        const currentValues = [...prev[category]];
        if (currentValues.includes(value)) {
          return { ...prev, [category]: currentValues.filter(item => item !== value) };
        } else {
          return { ...prev, [category]: [...currentValues, value] };
        }
      });
    }
  };

  const handleSelectChange = (category: 'location' | 'gender', value: string) => {
    setFilters(prev => ({ ...prev, [category]: value }));
  };

  const handleFeeRangeChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      feeRange: { min: value[0], max: value[1] }
    }));
  };

  const handleVerifiedChange = (checked: boolean) => {
    setFilters(prev => ({ ...prev, verified: checked }));
  };

  const handleReset = () => {
    setFilters(initialFilters);
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    setMobileFiltersOpen(false);
  };

  const filtersContent = (
    <div className="space-y-6">
      {/* Case Type */}
      <Accordion type="single" collapsible defaultValue="case-type">
        <AccordionItem value="case-type">
          <AccordionTrigger className="text-base font-medium">Case Type</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-2 pt-1">
              {caseTypeOptions.slice(0, 6).map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`case-type-${type}`}
                    checked={filters.caseType.includes(type)}
                    onCheckedChange={(checked) => {
                      if (checked) handleCheckboxChange('caseType', type);
                      else handleCheckboxChange('caseType', type);
                    }}
                  />
                  <Label htmlFor={`case-type-${type}`} className="text-sm">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Courts */}
      <Accordion type="single" collapsible>
        <AccordionItem value="courts">
          <AccordionTrigger className="text-base font-medium">Courts</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-2 pt-1">
              {courtOptions.slice(0, 6).map((court) => (
                <div key={court} className="flex items-center space-x-2">
                  <Checkbox
                    id={`court-${court}`}
                    checked={filters.court.includes(court)}
                    onCheckedChange={(checked) => {
                      if (checked) handleCheckboxChange('court', court);
                      else handleCheckboxChange('court', court);
                    }}
                  />
                  <Label htmlFor={`court-${court}`} className="text-sm">
                    {court}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location" className="text-base font-medium">Location</Label>
        <Select
          value={filters.location}
          onValueChange={(value) => handleSelectChange('location', value)}
        >
          <SelectTrigger id="location">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Locations</SelectItem>
            {locationOptions.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Languages */}
      <Accordion type="single" collapsible>
        <AccordionItem value="languages">
          <AccordionTrigger className="text-base font-medium">Languages</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {languageOptions.slice(0, 8).map((language) => (
                <div key={language} className="flex items-center space-x-2">
                  <Checkbox
                    id={`language-${language}`}
                    checked={filters.language.includes(language)}
                    onCheckedChange={(checked) => {
                      if (checked) handleCheckboxChange('language', language);
                      else handleCheckboxChange('language', language);
                    }}
                  />
                  <Label htmlFor={`language-${language}`} className="text-sm">
                    {language}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Gender */}
      <div className="space-y-2">
        <Label htmlFor="gender" className="text-base font-medium">Gender</Label>
        <Select
          value={filters.gender}
          onValueChange={(value) => handleSelectChange('gender', value)}
        >
          <SelectTrigger id="gender">
            <SelectValue placeholder="Any gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any Gender</SelectItem>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Fee Range */}
      <div className="space-y-2">
        <Label className="text-base font-medium">Fee Range (₹)</Label>
        <div className="space-y-4">
          <Slider
            defaultValue={[filters.feeRange.min, filters.feeRange.max]}
            max={10000}
            step={500}
            onValueChange={handleFeeRangeChange}
            className="mt-6"
          />
          <div className="flex items-center justify-between">
            <span>₹{filters.feeRange.min.toLocaleString()}</span>
            <span>₹{filters.feeRange.max.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Verified Only */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="verified"
          checked={filters.verified}
          onCheckedChange={(checked) => handleVerifiedChange(checked as boolean)}
        />
        <Label htmlFor="verified" className="text-base font-medium">
          DAL Verified only
        </Label>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block w-64 bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Filters</h3>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Reset
          </Button>
        </div>
        {filtersContent}
        <Button className="w-full mt-6" onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </div>

      {/* Mobile Filters Button */}
      <div className="lg:hidden flex-shrink-0">
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-md overflow-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between">
                <span>Filters</span>
                <Button variant="ghost" size="sm" onClick={handleReset} className="h-8 px-2 text-xs">
                  Reset All
                </Button>
              </SheetTitle>
            </SheetHeader>
            <div className="py-6">{filtersContent}</div>
            <SheetFooter>
              <Button className="w-full" onClick={handleApplyFilters}>
                Apply Filters
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default AdvocateFilters;
