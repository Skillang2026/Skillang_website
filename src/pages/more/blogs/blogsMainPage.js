import React from "react";
import BlogMainPageHeader from "../../../sections/more/blogs/main-blog-page/header/BlogMainPageHeader";
import EditorsChoiceSection from "../../../sections/more/blogs/main-blog-page/editors-choice-section/EditorsChoiceSection";
import ChooseByCategory from "../../../sections/more/blogs/main-blog-page/choose-by-category/ChooseByCategory";

const BlogsMainPage = () => {
  return (
    <>
      <BlogMainPageHeader />
      <EditorsChoiceSection />
      {/* <ChooseByCategory /> */}
    </>
  );
};

export default BlogsMainPage;
