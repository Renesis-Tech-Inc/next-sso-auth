import React, { ChangeEvent, useRef, useState } from "react";
import ImageComponent from "@components/global/image";
import { Button } from "@components/global/button";
import Input from "@components/global/forms/Input";
import { getCookie } from "@utils/getCookie";
import { toast } from "react-toastify";
import { IUploadDocument } from "@validations/uploadDocument";
import { HttpService } from "@services/base.service";
import { EAuthenticationRoutes } from "@enums/routes.enum";
import { useRouter } from "next/router";
import { useDebouncedClick } from "@hooks/useDebouncedClick";
import { userService } from "@services/user.service";
import { errorHandler } from "@utils/errorHandler";

import useLoggedInUser from "@hooks/useLoggedInUser";

const ProfileSettings = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [handleClick, loadingStates] = useDebouncedClick();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { User, isLoading }: any = useLoggedInUser();

  /**
   * Handles the file upload process.
   * @param {IUploadDocument} values - The values containing the base64 data, file name, and file type.
   */
  const handleFileUpload = async (values: IUploadDocument) => {
    handleClick(async () => {
      try {
        const response = await userService.updateProfileImageHandler(values);
        const avatar = response.payload.user.avatar as string;
        HttpService.setCookie("avatar", avatar);
        toast.success(response?.message);
        router.push(EAuthenticationRoutes.SETTINGS);
      } catch (error: unknown) {
        errorHandler(error);
      }
    }, "fileLoading");
  };

  /**
   * Handles the change event of the image input field.
   * @param {ChangeEvent<HTMLInputElement>} event - The change event object.
   */
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        // File is not an image, throw an error or set an error state
        toast.error("File type not supported. Please select an image file.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileType = file.type.split("image/").pop() as string;
        const acceptedFormats = {
          "image/*": [".jpeg", ".png"],
        };
        const maxFileSize = 5;
        if (
          !fileType ||
          !(acceptedFormats["image/*"] || []).includes(`.${fileType}`)
        ) {
          // File type is not supported
          toast.error("File type not supported");
          return;
        }

        if (file.size > maxFileSize * 1024 * 1024) {
          // File size exceeds the maximum allowed size
          toast.error(`File size exceeds ${maxFileSize} MB`);
          return;
        }
        const fileName = file.name
          .split(`.${fileType}`)
          .shift()
          ?.split(" ")
          .join("_") as string;

        const image = reader.result as string;
        const base64Data = image.split(";base64,").pop() as string;
        handleFileUpload({
          base64Data: base64Data,
          fileName: fileName,
          fileType,
        });
        setPreviewImage(image);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <div className="mb-8">
        <h5 className="font-medium text-white">Profile Settings</h5>
        <p className="text-aluminium text-sm">
          Kindly input the details below to update your profile.
        </p>
      </div>
      <div className="rt-profilePicture">
        {isLoading ? (
          <ImageComponent
            src={"/assets/images/avatar.svg"}
            priority
            fill={true}
            figClassName="w-[120px] h-[120px] rounded-full"
            className="rounded-full object-cover"
          />
        ) : (
          <div>
            {previewImage ? (
              <ImageComponent
                src={previewImage}
                priority
                fill={true}
                figClassName="w-[120px] h-[120px] rounded-full"
                className="rounded-full object-cover"
              />
            ) : (
              <ImageComponent
                src={User?.avatar || "/assets/images/avatar.svg"}
                priority
                fill={true}
                figClassName="w-[120px] h-[120px] rounded-full"
                className="rounded-full object-cover"
              />
            )}
          </div>
        )}
        <div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }} // Hide the input element
          />
          <Button
            size="md"
            className="mb-2.5"
            onClick={handleButtonClick}
            disabled={loadingStates["fileLoading"]}
            isLoading={loadingStates["fileLoading"]}
          >
            Upload Photo
          </Button>
          <p className="text-aluminium text-sm">
            You can upload JPG or PNG image file
            <span className="block ">File size max 5MB</span>
          </p>
        </div>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <div className="form-group relative">
          <Input
            type={"text"}
            id={"fullName"}
            required={false}
            disabled={true}
            name={"fullName"}
            label={"Full Name"}
            value={getCookie("fullName")?.split("_").join(" ") || ""}
            containerClass={"mb-6"}
            placeholder={"Enter your full name"}
          />
          <Input
            placeholder={"Email"}
            label={"Email"}
            type="email"
            name={"email"}
            disabled={true}
            value={getCookie("email")?.split("_").join(" ") || ""}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;
