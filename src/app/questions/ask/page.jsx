"use client";

import { Form, FormDescription } from "@/components/ui/form";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  image: z.any().optional(),
});

function AskQuestion() {
  const [tagInput, setTagInput] = React.useState("");
  const [imagePreview, setImagePreview] = React.useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
      image: null,
    },
  });

  function onSubmit(values) {
    console.log("FORM DATA 👉", values);
  }

  function addTag() {
    if (!tagInput.trim()) return;

    const currentTags = form.getValues("tags");
    form.setValue("tags", [...currentTags, tagInput.trim()]);
    setTagInput("");
  }

  function removeTag(index) {
    const updated = [...form.getValues("tags")];
    updated.splice(index, 1);
    form.setValue("tags", updated);
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    form.setValue("image", file);
    setImagePreview(URL.createObjectURL(file));
  }

  return (
    <div className="mt-20 mb-20 flex flex-col gap-4 px-20">
      <h1 className="text-2xl font-bold text-white">Ask a Question</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* title */}
          <div className="flex flex-col gap-2 rounded-md border border-gray-700 bg-black px-5 py-4">
            <Label className="text-xl text-white">Title Address</Label>
            <FormDescription>Be specific and clear.</FormDescription>
            <Input
              {...form.register("title")}
              placeholder="Enter your title"
              className="bg-black/20 text-white"
            />
          </div>

          {/* content */}
          <div className="flex flex-col gap-2 rounded-md border border-gray-700 bg-black px-5 py-4">
            <Label className="text-xl text-white">
              What are the details of your problem?
            </Label>
            <FormDescription>Minimum 20 characters.</FormDescription>

            <Controller
              name="content"
              control={form.control}
              render={({ field }) => (
                <MDEditor value={field.value} onChange={field.onChange} />
              )}
            />
          </div>

          {/* image */}
          <div className="flex flex-col gap-2 rounded-md border border-gray-700 bg-black px-5 py-4">
            <Label className="text-xl text-white">Image</Label>
            <FormDescription>Add an image (optional).</FormDescription>

            <Input
              type="file"
              accept="image/*"
              className="cursor-pointer bg-black/20 text-white"
              onChange={handleImageChange}
            />

            {imagePreview && (
              <div className="mt-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-48 rounded border border-gray-600 object-cover"
                />
              </div>
            )}
          </div>

          {/* tags */}
          <div className="flex flex-col gap-2 rounded-md border border-gray-700 bg-black px-5 py-4">
            <Label className="text-xl text-white">Tags</Label>
            <FormDescription>Add relevant tags</FormDescription>

            <div className="flex flex-wrap gap-2">
              {form.watch("tags").map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 rounded bg-gray-700 px-3 py-1 text-white"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="text-red-400"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>

            {/* TAG INPUT */}
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="react, nextjs, markdown"
                className="bg-black/20 text-white"
              />
              <Button type="button" onClick={addTag}>
                Add
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="mt-4 cursor-pointer rounded px-6 py-2 text-white"
          >
            Publish
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AskQuestion;
