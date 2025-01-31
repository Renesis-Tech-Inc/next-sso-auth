/**
 * Custom hook to determine the logged-in status of the user.
 * It returns an array containing two elements:
 * - isLoggedIn: A boolean indicating whether the user is logged in or not.
 * - isLoading: A boolean indicating whether the hook is still loading or not.
 */
import { useEffect, useState } from "react";
import { getCookie } from "@utils/getCookie";
import { userService } from "@services/user.service";

const useLoggedInUser = (userInput = ""): [boolean, boolean, any] => {
  const [User, setUser]: any = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    /**
     * Function to check if the user is logged in.
     * It sets the state variables isLoggedIn and isLoading accordingly.
     */
    const checkLoggedIn = async () => {
      if (getCookie("token")) {
        try {
          const response = await userService.getProfileHandler();
          setUser(response.payload.user);
          const avatar = response.payload.user.avatar as string;

          setSelectedImage(avatar);
        } catch (error: unknown) {
          //   errorHandler(error);
        }
      }
      setIsLoading(false);
    };

    // Call the function to check the logged-in status when the component mounts
    checkLoggedIn();
  }, [userInput]);

  // Return the logged-in status and loading status
  return [User, isLoading, selectedImage];
};

export default useLoggedInUser;
