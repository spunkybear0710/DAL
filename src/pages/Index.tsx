
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/common/Footer";
import AdvocateSearch from "@/components/advocates/AdvocateSearch";
import AdvocateFilters from "@/components/advocates/AdvocateFilters";
import AdvocateCard from "@/components/advocates/AdvocateCard";
import { Button } from "@/components/ui/button";
import { Advocate, SearchFilters } from "@/types";
import { advocatesData, caseTypeOptions } from "@/data/advocatesData";
import { AlertCircle, ChevronRight, CheckCircle, Shield, Star } from "lucide-react";

const Index = () => {
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<SearchFilters>({
    caseType: [],
    court: [],
    location: "",
    language: [],
    gender: "",
    feeRange: { min: 0, max: 10000 },
    rating: 0,
    verified: false,
  });

  useEffect(() => {
    // Initially show all advocates
    setFilteredAdvocates(advocatesData);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredAdvocates(advocatesData);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    const results = advocatesData.filter(advocate => 
      advocate.name.toLowerCase().includes(lowerQuery) ||
      advocate.specialization.some(s => s.toLowerCase().includes(lowerQuery)) ||
      advocate.location.toLowerCase().includes(lowerQuery)
    );
    
    setFilteredAdvocates(results);
  };

  const handleApplyFilters = (filters: SearchFilters) => {
    setActiveFilters(filters);
    
    let results = [...advocatesData];
    
    // Filter by case type
    if (filters.caseType.length > 0) {
      results = results.filter(advocate => 
        filters.caseType.some(caseType => 
          advocate.specialization.includes(caseType)
        )
      );
    }
    
    // Filter by court
    if (filters.court.length > 0) {
      results = results.filter(advocate => 
        filters.court.some(court => 
          advocate.courts.includes(court)
        )
      );
    }
    
    // Filter by location
    if (filters.location) {
      results = results.filter(advocate => 
        advocate.location === filters.location
      );
    }
    
    // Filter by language
    if (filters.language.length > 0) {
      results = results.filter(advocate => 
        filters.language.some(language => 
          advocate.languages.includes(language)
        )
      );
    }
    
    // Filter by gender
    if (filters.gender) {
      results = results.filter(advocate => 
        advocate.gender === filters.gender
      );
    }
    
    // Filter by fee range
    results = results.filter(advocate => 
      advocate.consultationFee >= filters.feeRange.min &&
      advocate.consultationFee <= filters.feeRange.max
    );
    
    // Filter by verified status
    if (filters.verified) {
      results = results.filter(advocate => advocate.verified);
    }
    
    setFilteredAdvocates(results);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-dal-navy text-white py-16 md:py-24 relative">
          <div className="dal-container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
                Find the Right Legal Expert for Your Case
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 animate-fade-in">
                Connect with verified advocates across District Courts, High Courts, and the Supreme Court of India
              </p>
              
              {/* Search Component */}
              <div className="max-w-3xl mx-auto animate-fade-in">
                <AdvocateSearch onSearch={handleSearch} />
              </div>
              
              {/* Case Type Quick Links */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
                {caseTypeOptions.slice(0, 4).map((caseType) => (
                  <Button 
                    key={caseType} 
                    variant="secondary" 
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    onClick={() => {
                      const newFilters = { ...activeFilters };
                      newFilters.caseType = [caseType];
                      handleApplyFilters(newFilters);
                    }}
                  >
                    {caseType}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </section>
        
        {/* Feature Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="dal-container">
            <div className="text-center mb-12">
              <h2 className="dal-heading mb-3">Why Choose DAL?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                India's premier platform connecting clients with specialized legal professionals
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="bg-dal-gray-light p-4 rounded-full mb-4">
                  <CheckCircle className="h-8 w-8 text-dal-navy" />
                </div>
                <h3 className="dal-subheading mb-3">Verified Advocates</h3>
                <p className="text-gray-600">
                  All advocates on our platform are verified with their Bar Council ID for your peace of mind.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="bg-dal-gray-light p-4 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-dal-navy" />
                </div>
                <h3 className="dal-subheading mb-3">Secure Communication</h3>
                <p className="text-gray-600">
                  End-to-end encrypted communication and secure document handling for all your legal needs.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="bg-dal-gray-light p-4 rounded-full mb-4">
                  <Star className="h-8 w-8 text-dal-navy" />
                </div>
                <h3 className="dal-subheading mb-3">Client Reviews</h3>
                <p className="text-gray-600">
                  Transparent ratings and reviews from past clients to help you make an informed decision.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Top Advocates Section */}
        <section className="py-12 md:py-16 bg-dal-gray-light">
          <div className="dal-container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="dal-heading mb-2">Top Advocates</h2>
                <p className="text-gray-600">
                  Experienced legal professionals across various specializations
                </p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Button variant="outline" className="group flex items-center">
                  View All Advocates
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
            
            {/* Advocates Grid */}
            <div className="flex gap-6">
              {/* Filters - Desktop View */}
              <div className="hidden lg:block">
                <AdvocateFilters onApplyFilters={handleApplyFilters} />
              </div>
              
              {/* Advocates List */}
              <div className="w-full">
                {/* Mobile Filter Button */}
                <div className="lg:hidden mb-4 flex justify-between items-center">
                  <h3 className="text-lg font-medium">{filteredAdvocates.length} Advocates found</h3>
                  <AdvocateFilters onApplyFilters={handleApplyFilters} />
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  {filteredAdvocates.length > 0 ? (
                    filteredAdvocates.map(advocate => (
                      <AdvocateCard key={advocate.id} advocate={advocate} />
                    ))
                  ) : (
                    <div className="col-span-full flex items-center justify-center flex-col py-16">
                      <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-xl font-medium mb-2">No advocates found</h3>
                      <p className="text-gray-500 max-w-md text-center mb-6">
                        We couldn't find any advocates matching your current search criteria. Try adjusting your filters or search term.
                      </p>
                      <Button onClick={() => {
                        setSearchQuery("");
                        setActiveFilters({
                          caseType: [],
                          court: [],
                          location: "",
                          language: [],
                          gender: "",
                          feeRange: { min: 0, max: 10000 },
                          rating: 0,
                          verified: false,
                        });
                        setFilteredAdvocates(advocatesData);
                      }}>
                        Reset Filters
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="dal-container">
            <div className="text-center mb-12">
              <h2 className="dal-heading mb-3">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Connect with legal experts in just a few simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-dal-gray-light h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-dal-navy">1</span>
                </div>
                <h3 className="dal-subheading mb-3">Search & Filter</h3>
                <p className="text-gray-600">
                  Search for advocates based on specialization, location, court level, and more.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-dal-gray-light h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-dal-navy">2</span>
                </div>
                <h3 className="dal-subheading mb-3">Connect & Consult</h3>
                <p className="text-gray-600">
                  Book appointments online or request for in-person consultation with your chosen advocate.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-dal-gray-light h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-dal-navy">3</span>
                </div>
                <h3 className="dal-subheading mb-3">Review & Rate</h3>
                <p className="text-gray-600">
                  Share your experience and help other clients make informed decisions.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-dal-navy text-white">
          <div className="dal-container">
            <div className="md:flex items-center justify-between">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Are You an Advocate?</h2>
                <p className="text-lg opacity-90">
                  Join our platform to expand your reach and connect with potential clients looking for your expertise.
                </p>
              </div>
              <div>
                <Button className="bg-white text-dal-navy hover:bg-dal-gray-light" size="lg">
                  Register as an Advocate
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
