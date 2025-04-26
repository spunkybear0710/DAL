
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, X } from "lucide-react";
import AuthModal from "../auth/AuthModal";

const Navbar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [userType, setUserType] = useState<'client' | 'advocate'>('client');

  const handleOpenAuthModal = (mode: 'login' | 'register', type: 'client' | 'advocate') => {
    setAuthMode(mode);
    setUserType(type);
    setIsAuthModalOpen(true);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="dal-container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-dal-navy">
            DAL
          </span>
          <span className="hidden sm:inline-block text-lg font-medium">
            Dhundho Apna Lawyer
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Home
          </a>
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Find Lawyers
          </a>
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            For Advocates
          </a>
          <a href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            About Us
          </a>
          <Button 
            variant="outline" 
            onClick={() => handleOpenAuthModal('login', 'client')}
            className="mr-2"
          >
            Login
          </Button>
          <Button onClick={() => handleOpenAuthModal('register', 'client')}>
            Sign Up
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 pt-6">
                <a href="#" className="text-base font-medium hover:text-dal-blue transition-colors">
                  Home
                </a>
                <a href="#" className="text-base font-medium hover:text-dal-blue transition-colors">
                  Find Lawyers
                </a>
                <a href="#" className="text-base font-medium hover:text-dal-blue transition-colors">
                  For Advocates
                </a>
                <a href="#" className="text-base font-medium hover:text-dal-blue transition-colors">
                  About Us
                </a>
                <div className="flex flex-col gap-2 mt-4">
                  <Button 
                    variant="outline"
                    onClick={() => handleOpenAuthModal('login', 'client')}
                  >
                    Login as User
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleOpenAuthModal('login', 'advocate')}
                  >
                    Login as Advocate
                  </Button>
                  <Button 
                    onClick={() => handleOpenAuthModal('register', 'client')}
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        userType={userType}
        setMode={setAuthMode}
        setUserType={setUserType}
      />
    </header>
  );
};

export default Navbar;
