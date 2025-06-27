import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserType } from "@/types";
import { useToast } from "@/components/ui/use-toast";

// ✅ Firebase
import { auth, db } from "@/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "register";
  userType: UserType;
  setMode: (mode: "login" | "register") => void;
  setUserType: (type: UserType) => void;
}

const AuthModal = ({ isOpen, onClose, mode, userType, setMode, setUserType }: AuthModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "register" && formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure both passwords match.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (mode === "register") {
        console.log("Registering with:", formData.email);

        const userCred = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        const uid = userCred.user.uid;

        await setDoc(doc(db, "users", uid), {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: userType,
          isVerified: userType === "advocate" ? false : true,
          createdAt: new Date(),
        });

        console.log("User created and stored in Firestore:", uid);

        toast({
          title: "Registration Successful",
          description: `You have successfully registered as a ${userType}.`,
        });

      } else {
        toast({
          title: "Login (Not yet implemented)",
          description: "Firebase login logic goes here.",
        });
      }

      onClose();
    } catch (err: any) {
      toast({
        title: "Firebase Error",
        description: err.message || "An error occurred during authentication.",
        variant: "destructive",
      });
      console.error("Firebase Error:", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{mode === "login" ? "Login" : "Create an Account"}</DialogTitle>
          <DialogDescription>
            {mode === "login"
              ? "Enter your credentials to access your account."
              : "Fill in the details below to create your account."}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={userType} onValueChange={(value) => setUserType(value as UserType)} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="client">User/Client</TabsTrigger>
            <TabsTrigger value="advocate">Advocate</TabsTrigger>
          </TabsList>

          {/* CLIENT FORM */}
          <TabsContent value="client" className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {mode === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <Button type="button" variant="link" onClick={() => setMode(mode === "login" ? "register" : "login")}>
                  {mode === "login" ? "Create Account" : "Already have an account?"}
                </Button>
                <Button type="submit">{mode === "login" ? "Login" : "Register"}</Button>
              </div>
            </form>
          </TabsContent>

          {/* ADVOCATE FORM */}
          <TabsContent value="advocate" className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="bg-dal-gray-light p-3 rounded-md text-sm">
                    <p className="font-medium text-dal-navy">Note for Advocates:</p>
                    <p>
                      Registration requires verification with your Bar Council ID. Additional verification steps will follow after initial registration.
                    </p>
                  </div>
                </>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {mode === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <Button type="button" variant="link" onClick={() => setMode(mode === "login" ? "register" : "login")}>
                  {mode === "login" ? "Create Account" : "Already have an account?"}
                </Button>
                <Button type="submit">{mode === "login" ? "Login" : "Register"}</Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
