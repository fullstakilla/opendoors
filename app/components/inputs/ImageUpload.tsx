import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from 'react-icons/tb';

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
    const handleUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                onChange(reader.result as string);
            };

            reader.readAsDataURL(file);
        }
    }, [onChange]);

    return (
        <div className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600">
            <label htmlFor="image-upload" className="flex flex-col items-center">
                <TbPhotoPlus size={50} />
                <div className="font-semibold text-lg">
                    Click to upload
                </div>
                {value && (
                    <div className="absolute inset-0 w-full h-full">
                        <Image fill style={{ objectFit: 'cover' }} src={value} alt="House" />
                    </div>
                )}
            </label>
            <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
            />
        </div>
    );
};

export default ImageUpload;
