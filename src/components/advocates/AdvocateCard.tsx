
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Advocate } from "@/types";
import { Star, CheckCircle, MapPin, Phone, Mail, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface AdvocateCardProps {
  advocate: Advocate;
}

const AdvocateCard = ({ advocate }: AdvocateCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Profile Image & Basic Info */}
          <div className="w-full md:w-1/3 p-4 flex flex-col items-center justify-center bg-dal-gray-light">
            <div className="relative">
              <img 
                src={advocate.profileImage} 
                alt={advocate.name} 
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white"
              />
              {advocate.verified && (
                <span className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full">
                  <CheckCircle className="h-4 w-4" />
                </span>
              )}
            </div>
            <h3 className="mt-3 font-bold text-lg text-dal-navy text-center">{advocate.name}</h3>
            <div className="flex items-center mt-1 mb-2">
              <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
              <span className="ml-1 text-sm font-medium">{advocate.rating}</span>
              <span className="ml-1 text-xs text-gray-500">({advocate.reviews} reviews)</span>
            </div>
            <div className="flex flex-wrap justify-center gap-1 mt-1">
              {advocate.specialization.map((spec, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-white">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Details */}
          <div className="w-full md:w-2/3 p-4">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm">{advocate.location}</span>
                </div>
                
                <div className="mb-3">
                  <div className="text-sm mb-1"><span className="font-medium">Experience:</span> {advocate.experience} years</div>
                  <div className="text-sm mb-1">
                    <span className="font-medium">Languages:</span> {advocate.languages.join(", ")}
                  </div>
                  <div className="text-sm mb-1">
                    <span className="font-medium">Courts:</span> {advocate.courts.join(", ")}
                  </div>
                  <div className="text-sm mb-1">
                    <span className="font-medium">Consultation Fee:</span> ₹{advocate.consultationFee.toLocaleString()}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {advocate.about}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <Button className="flex-1" size="sm">
                  <Phone className="h-4 w-4 mr-2" /> Contact
                </Button>
                <Button variant="outline" className="flex-1" size="sm">
                  <Calendar className="h-4 w-4 mr-2" /> Book Appointment
                </Button>
                <Button variant="secondary" className="flex-1" size="sm" asChild>
                  <Link to={`/advocate/${advocate.id}`}>View Profile</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvocateCard;
