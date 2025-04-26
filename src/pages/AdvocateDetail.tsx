
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Advocate } from "@/types";
import { advocatesData } from "@/data/advocatesData";
import { 
  Star,
  Clock,
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  CheckCircle, 
  FileText, 
  MessageSquare,
  Award,
  Bookmark,
  Share2
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AdvocateDetail = () => {
  const { advocateId } = useParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("about");
  
  // Find the advocate based on the ID from the URL
  const advocate = advocatesData.find(adv => adv.id === advocateId);
  
  if (!advocate) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Advocate Not Found</h1>
            <p className="mb-6">The advocate you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBookAppointment = () => {
    toast({
      title: "Appointment Request Sent",
      description: `Your appointment request has been sent to ${advocate.name}.`,
    });
  };

  const handleContactClick = () => {
    toast({
      title: "Contact Information",
      description: "You can now contact this advocate directly.",
    });
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile Saved",
      description: "This advocate has been saved to your favorites.",
    });
  };

  const handleShareProfile = () => {
    toast({
      title: "Share Link Generated",
      description: "A link to this advocate's profile has been copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-dal-gray-light">
        {/* Hero Section with Advocate Basic Info */}
        <section className="bg-white pt-8 pb-6 border-b shadow-sm">
          <div className="dal-container">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                  <img 
                    src={advocate.profileImage} 
                    alt={advocate.name} 
                    className="object-cover" 
                  />
                </Avatar>
                {advocate.verified && (
                  <span className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full">
                    <CheckCircle className="h-5 w-5" />
                  </span>
                )}
              </div>
              
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold">{advocate.name}</h1>
                  {advocate.verified && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      DAL Verified
                    </Badge>
                  )}
                </div>
                
                <div className="mt-2 flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 stroke-yellow-400" />
                  <span className="ml-1 font-medium">{advocate.rating}</span>
                  <span className="ml-1 text-gray-500">({advocate.reviews} reviews)</span>
                </div>
                
                <div className="mt-2 flex flex-wrap gap-2">
                  {advocate.specialization.map((spec, index) => (
                    <Badge key={index} variant="secondary" className="bg-dal-gray-light">
                      {spec}
                    </Badge>
                  ))}
                </div>
                
                <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{advocate.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{advocate.experience} years experience</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-1" />
                    <span>{advocate.courts.join(", ")}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col w-full md:w-auto gap-3 mt-4 md:mt-0">
                <Button className="w-full md:w-auto" onClick={handleBookAppointment}>
                  <Calendar className="mr-2 h-4 w-4" /> Book Appointment
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={handleContactClick}>
                    <Phone className="mr-2 h-4 w-4" /> Contact
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={handleSaveProfile}>
                    <Bookmark className="mr-2 h-4 w-4" /> Save
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleShareProfile}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Detail Content */}
        <section className="py-8">
          <div className="dal-container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    <TabsTrigger value="cases">Case History</TabsTrigger>
                  </TabsList>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <TabsContent value="about">
                        <h2 className="text-xl font-semibold mb-4">About {advocate.name}</h2>
                        <p className="text-gray-700 mb-6">
                          {advocate.about}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Languages */}
                          <div>
                            <h3 className="text-lg font-medium mb-3">Languages</h3>
                            <div className="flex flex-wrap gap-2">
                              {advocate.languages.map((language, idx) => (
                                <Badge key={idx} variant="outline">
                                  {language}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          {/* Courts */}
                          <div>
                            <h3 className="text-lg font-medium mb-3">Courts</h3>
                            <div className="flex flex-wrap gap-2">
                              {advocate.courts.map((court, idx) => (
                                <Badge key={idx} variant="outline">
                                  {court}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-8">
                          <h3 className="text-lg font-medium mb-3">Education & Qualifications</h3>
                          <ul className="space-y-3">
                            <li className="flex">
                              <div className="mr-4 text-dal-navy">
                                <FileText className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium">LL.B. from National Law University, Delhi</p>
                                <p className="text-gray-500 text-sm">2008 - 2013</p>
                              </div>
                            </li>
                            <li className="flex">
                              <div className="mr-4 text-dal-navy">
                                <FileText className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium">Bar Council of India Registration</p>
                                <p className="text-gray-500 text-sm">Registration Number: BCI/DEL/12345</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="experience">
                        <h2 className="text-xl font-semibold mb-4">Professional Experience</h2>
                        <ul className="space-y-6">
                          <li className="border-l-2 border-dal-navy pl-4 pb-6">
                            <div className="flex flex-col">
                              <span className="text-lg font-medium">Senior Advocate</span>
                              <span className="text-gray-500">High Court of Delhi</span>
                              <span className="text-gray-500 text-sm">2018 - Present</span>
                              <p className="mt-2 text-gray-700">
                                Specializing in corporate and commercial litigation, representing major corporations in complex legal disputes.
                              </p>
                            </div>
                          </li>
                          <li className="border-l-2 border-dal-navy pl-4">
                            <div className="flex flex-col">
                              <span className="text-lg font-medium">Associate Advocate</span>
                              <span className="text-gray-500">Legal Counsel Associates</span>
                              <span className="text-gray-500 text-sm">2013 - 2018</span>
                              <p className="mt-2 text-gray-700">
                                Handled cases related to civil disputes, contract law, and property matters.
                              </p>
                            </div>
                          </li>
                        </ul>
                        
                        <div className="mt-8">
                          <h3 className="text-lg font-semibold mb-4">Areas of Expertise</h3>
                          <div className="grid grid-cols-2 gap-3">
                            {advocate.specialization.map((spec, idx) => (
                              <div key={idx} className="flex items-center">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                <span>{spec}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="reviews">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-xl font-semibold">Client Reviews</h2>
                          <div className="flex items-center">
                            <Star className="h-6 w-6 fill-yellow-400 stroke-yellow-400" />
                            <span className="ml-1 font-semibold text-lg">{advocate.rating}</span>
                            <span className="ml-1 text-gray-500">({advocate.reviews} reviews)</span>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          {/* Sample Reviews */}
                          <div className="border-b pb-4">
                            <div className="flex justify-between mb-2">
                              <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-3">
                                  <img src="/placeholder.svg" alt="Client" />
                                </Avatar>
                                <div>
                                  <p className="font-medium">Rahul Singh</p>
                                  <p className="text-gray-500 text-sm">Jun 15, 2023</p>
                                </div>
                              </div>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star 
                                    key={star} 
                                    className={`h-4 w-4 ${star <= 5 ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700">
                              Extremely professional and knowledgeable. Helped me resolve my property dispute efficiently. Highly recommended!
                            </p>
                          </div>
                          
                          <div className="border-b pb-4">
                            <div className="flex justify-between mb-2">
                              <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-3">
                                  <img src="/placeholder.svg" alt="Client" />
                                </Avatar>
                                <div>
                                  <p className="font-medium">Priya Mehta</p>
                                  <p className="text-gray-500 text-sm">May 3, 2023</p>
                                </div>
                              </div>
                              <div className="flex">
                                {[1, 2, 3, 4].map((star) => (
                                  <Star 
                                    key={star} 
                                    className={`h-4 w-4 ${star <= 4 ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}`} 
                                  />
                                ))}
                                {[5].map((star) => (
                                  <Star
                                    key={star}
                                    className="h-4 w-4 stroke-gray-300"
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700">
                              Very responsive and dedicated to my case. The only reason for 4 stars is that the legal process took longer than expected.
                            </p>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-2">
                              <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-3">
                                  <img src="/placeholder.svg" alt="Client" />
                                </Avatar>
                                <div>
                                  <p className="font-medium">Amit Kumar</p>
                                  <p className="text-gray-500 text-sm">Mar 22, 2023</p>
                                </div>
                              </div>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star 
                                    key={star} 
                                    className={`h-4 w-4 ${star <= 5 ? "fill-yellow-400 stroke-yellow-400" : "stroke-gray-300"}`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700">
                              Outstanding advocate who genuinely cares about clients. Explained complex legal matters in simple terms and represented me very effectively in court.
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="cases">
                        <h2 className="text-xl font-semibold mb-4">Notable Case History</h2>
                        <p className="text-gray-600 mb-6">
                          Below are some of the publicly available cases handled by {advocate.name}. This information is gathered from public records.
                        </p>
                        
                        <div className="space-y-6">
                          <div className="border rounded-md p-4 hover:bg-gray-50">
                            <div className="flex justify-between mb-2">
                              <h3 className="font-medium">Corporate Arbitration: ABC Corp vs XYZ Ltd</h3>
                              <Badge>Resolved</Badge>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">Delhi High Court • 2022</p>
                            <p className="text-gray-700 mb-2">
                              Successfully represented client in a complex corporate arbitration case involving breach of contract claims.
                            </p>
                            <p className="text-gray-500 text-sm">
                              Case No: ARB/DHC/2022/457
                            </p>
                          </div>
                          
                          <div className="border rounded-md p-4 hover:bg-gray-50">
                            <div className="flex justify-between mb-2">
                              <h3 className="font-medium">Property Dispute: Singh vs Sharma</h3>
                              <Badge>Resolved</Badge>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">District Court, New Delhi • 2021</p>
                            <p className="text-gray-700 mb-2">
                              Represented client in a property boundary dispute case with favorable judgment.
                            </p>
                            <p className="text-gray-500 text-sm">
                              Case No: PROP/NDC/2021/1345
                            </p>
                          </div>
                          
                          <div className="border rounded-md p-4 hover:bg-gray-50">
                            <div className="flex justify-between mb-2">
                              <h3 className="font-medium">Consumer Protection Case: Mehta vs Elite Services</h3>
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
                                Ongoing
                              </Badge>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">Consumer Forum, Delhi • 2023</p>
                            <p className="text-gray-700 mb-2">
                              Representing client in a consumer protection case against faulty service and breach of warranty.
                            </p>
                            <p className="text-gray-500 text-sm">
                              Case No: CONS/DF/2023/789
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                    </CardContent>
                  </Card>
                </Tabs>
              </div>
              
              {/* Sidebar Information */}
              <div className="space-y-6">
                {/* Consultation Fee */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-3">Consultation Fee</h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-2xl font-bold text-dal-navy">₹{advocate.consultationFee.toLocaleString()}</span>
                      <span className="ml-2 text-gray-500">per consultation</span>
                    </div>
                    <Button className="w-full" onClick={handleBookAppointment}>
                      Book Consultation
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">
                      Consultation fee is for initial 45-minute session
                    </p>
                  </CardContent>
                </Card>
                
                {/* Contact Information */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                    <ul className="space-y-4">
                      <li className="flex">
                        <Phone className="h-5 w-5 text-dal-navy mr-3" />
                        <div>
                          <p className="text-gray-500 text-sm">Phone</p>
                          <p>{advocate.contactInfo.phone}</p>
                        </div>
                      </li>
                      <li className="flex">
                        <Mail className="h-5 w-5 text-dal-navy mr-3" />
                        <div>
                          <p className="text-gray-500 text-sm">Email</p>
                          <p>{advocate.contactInfo.email}</p>
                        </div>
                      </li>
                      <li className="flex">
                        <MapPin className="h-5 w-5 text-dal-navy mr-3" />
                        <div>
                          <p className="text-gray-500 text-sm">Office Address</p>
                          <p>{advocate.contactInfo.address}</p>
                        </div>
                      </li>
                    </ul>
                    <div className="mt-4 pt-4 border-t">
                      <Button variant="outline" className="w-full" onClick={handleContactClick}>
                        <MessageSquare className="mr-2 h-4 w-4" /> Send Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Availability */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-3">Availability</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-gray-600">Monday</span>
                        <span>10:00 AM - 6:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Tuesday</span>
                        <span>10:00 AM - 6:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Wednesday</span>
                        <span>10:00 AM - 6:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Thursday</span>
                        <span>10:00 AM - 6:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Friday</span>
                        <span>10:00 AM - 6:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Saturday</span>
                        <span>11:00 AM - 3:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Sunday</span>
                        <span className="text-gray-500">Closed</span>
                      </li>
                    </ul>
                    <div className="mt-4 pt-4 border-t">
                      <Button className="w-full" onClick={handleBookAppointment}>
                        <Calendar className="mr-2 h-4 w-4" /> Check Calendar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdvocateDetail;
