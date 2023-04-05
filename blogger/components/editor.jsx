import dynamic from "next/dynamic";
import parse from "html-react-parser";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

const Editor = ({ setData, valueMarkdown }) => {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];
  return (
    <>
      <QuillNoSSRWrapper
        modules={modules}
        formats={formats}
        theme="snow"
        value={valueMarkdown}
        onChange={(content) => {
          setData({
            html: content,
          });
        }}
      />
    </>
  );
};

export default Editor;
