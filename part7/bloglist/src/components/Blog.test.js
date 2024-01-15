import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Blog from "./Blog";
import BlogForm from "./BlogForm";

describe("Blog component", () => {
  const blog = {
    title: "Testing Title",
    author: "Testing Author",
    url: "https://testing.com",
    likes: 100,
  };

  test("initially displays title and author, but not URL or likes", () => {
    render(<Blog blog={blog} />);

    expect(screen.getByText("Testing Title Testing Author")).toBeDefined();
    expect(screen.queryByText("https://testing.com")).not.toBeInTheDocument();
    expect(screen.queryByText("100")).not.toBeInTheDocument();
  });

  test("displays URL and likes after 'Show Details' button is clicked", async () => {
    render(<Blog blog={blog} />);
    const user = userEvent.setup();

    await user.click(screen.getByText("Show Details"));

    expect(screen.getByText("https://testing.com")).toBeInTheDocument();
    expect(screen.getByText("100", { exact: false })).toBeInTheDocument();
  });

  test("'like' button handler is called twice when the button is clicked twice", async () => {
    const mockUpdateLike = jest.fn();
    render(<Blog blog={blog} updateLike={mockUpdateLike} />);
    const user = userEvent.setup();

    await user.click(screen.getByText("Show Details"));
    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockUpdateLike).toHaveBeenCalledTimes(2);
  });
});

describe("BlogForm component", () => {
  test("calls submit handler with correct details when a new blog is created", async () => {
    const mockAddBlog = jest.fn();
    const user = userEvent.setup();
    render(<BlogForm addBlog={mockAddBlog} />);

    const titleInput = screen.getByPlaceholderText("title");
    const authorInput = screen.getByPlaceholderText("author");
    const urlInput = screen.getByPlaceholderText("url");

    await user.type(titleInput, "Testing Title Title");
    await user.type(authorInput, "Testing Author");
    await user.type(urlInput, "https://testing.com");

    await user.click(screen.getByText("create"));

    expect(mockAddBlog).toHaveBeenCalledTimes(1);
  });
});
