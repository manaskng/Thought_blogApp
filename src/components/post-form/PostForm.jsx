import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import imageCompression from "browser-image-compression";

export default function PostForm({ post }) {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues,
    } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

   const submit = async (data) => {
    let file = null;

    if (data.image && data.image.length > 0) {
        file = await appwriteService.uploadFile(data.image[0]);
    }

    if (post) {
        if (file) {
            await appwriteService.deleteFile(post.featuredImage);
        }

        const updatedPost = await appwriteService.updatePost(post.$id, {
            ...data,
            featuredImage: file ? file.$id : post.featuredImage,
        });

        if (updatedPost) navigate(`/post/${updatedPost.$id}`);
    } else {
        if (file) {
            const newPost = await appwriteService.createPost({
                ...data,
                featuredImage: file.$id,
                userId: userData.$id,
            });

            if (newPost) navigate(`/post/${newPost.$id}`);
        } else {
            alert("Please upload an image.");
        }
    }
};


    const slugTransform = useCallback((value) => {
        return value
            ?.trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s+/g, "-") || "";
    }, []);

    useEffect(() => {
        const sub = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => sub.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col lg:flex-row gap-8 p-4 bg-white dark:bg-neutral-900 shadow-md rounded-2xl"
        >
            {/* Left section: Text inputs */}
            <div className="lg:w-2/3 w-full space-y-6">
                <Input
                    label="Title"
                    placeholder="Enter title"
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug"
                    placeholder="Auto-generated slug"
                    {...register("slug", { required: true })}
                    onInput={(e) =>
                        setValue("slug", slugTransform(e.currentTarget.value), {
                            shouldValidate: true,
                        })
                    }
                />

                <RTE
                    label="Content"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            {/* Right section: File + Select */}
            <div className="lg:w-1/3 w-full space-y-6">
               <Input
  label="Featured Image"
  type="file"
  accept="image/*"
  {...register("image")}
/>
                {post?.featuredImage && (
                    <div>
                        <p className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Current Image:</p>
                        <img
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt="Current"
                            className="rounded-lg border max-h-[240px] object-contain"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/fallback-image.svg";
                            }}
                        />
                    </div>
                )}

                <Select
                    label="Status"
                    options={["active", "inactive"]}
                    {...register("status", { required: true })}
                />

                <Button
                    type="submit"
                    bgColor={post ? "bg-green-600" : "bg-blue-600"}
                    className="w-full text-white py-2"
                >
                    {post ? "Update Post" : "Create Post"}
                </Button>
            </div>
        </form>
    );
}
