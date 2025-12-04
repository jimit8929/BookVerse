import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  UnderlineType,
  ImageRun,
} from "docx";

import { image, PDFDocument } from "pdfkit";

import { MarkdownIt } from "markdown-it";

import Book from "../models/Book.js";

import path from "path";

import fs from "fs";

const md = new MarkdownIt();

//Typography configuration matching the PDF export

const DOCX_STYLES = {
  fonts: {
    body: "Charter",
    heading: "Inter",
  },
  sizes: {
    title: 32,
    subtitle: 20,
    author: 18,
    chapterTitle: 24,
    h1: 20,
    h2: 18,
    h3: 16,
    body: 12,
  },
  spacing: {
    paragraphBefore: 200,
    paragraphAfter: 200,
    chapterBefore: 400,
    chapterAfter: 300,
    headingBefore: 300,
    headingAfter: 150,
  },
};

//Process Markdown content to docx Paragraphs
export const processMarkdownToDocx = (markdown) => {
  const tokens = md.parse(markdown, {});
  const paragraphs = [];
  let inList = false;
  let listType = null;
  let orderedCounter = 1;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    try {
      if (token.type === "heading_open") {
        const level = parseInt(token.tag.substring(1), 10);
        const nextToken = tokens[i + 1];

        if (nextToken && nextToken.type === "inline") {
          let headingLevel;
          let fontSize;

          switch (level) {
            case 1:
              headingLevel = HeadingLevel.HEADING_1;
              fontSize = DOCX_STYLES.sizes.h1;
              break;
            case 2:
              headingLevel = HeadingLevel.HEADING_2;
              fontSize = DOCX_STYLES.sizes.h2;
              break;
            case 3:
              headingLevel = HeadingLevel.HEADING_3;
              fontSize = DOCX_STYLES.sizes.h3;
              break;
            default:
              headingLevel = HeadingLevel.HEADING_3;
              fontSize = DOCX_STYLES.sizes.h3;
          }

          paragraphs.push(
            new Paragraph({
              text: nextToken.content,
              heading: headingLevel,
              spacing: {
                before: DOCX_STYLES.spacing.headingBefore,
                after: DOCX_STYLES.spacing.headingAfter,
              },
              style: {
                font: DOCX_STYLES.fonts.heading,
                size: fontSize * 2,
              },
            })
          );

          i = i + 2;
        }
      } else if (token.type === "paragraph_open") {
        const nextToken = tokens[i + 1];

        if (nextToken && nextToken.type === "inline" && nextToken.children) {
          const textRuns = processInlineContent(nextToken.children);

          if (textRuns.length > 0) {
            paragraphs.push(
              new Paragraph({
                children: textRuns,
                spacing: {
                  before: inList ? 100 : DOCX_STYLES.spacing.paragraphBefore,
                  after: inList ? 100 : DOCX_STYLES.spacing.paragraphAfter,
                  line: 360,
                },
                alignment: AlignmentType.JUSTIFIED,
              })
            );
          }

          i = i + 2;
        }
      } else if (token.type === "bullet_list_open") {
        inList = true;
        listType = "bullet";
      } else if (token.type === "bullet_list_close") {
        inList = false;
        listType = null;

        //Add spacing after list
        paragraphs.push(
          new Paragraph({
            text: "",
            spacing: { after: 100 },
          })
        );
      } else if (token.type === "ordered_list_open") {
        inList = true;
        listType = "ordered";
        orderedCounter = 1;
      } else if (token.type === "ordered_list_close") {
        inList = false;
        listType = null;
        orderedCounter = 1;

        paragraphs.push(
          new Paragraph({
            text: "",
            spacing: { after: 100 },
          })
        );
      } else if (token.type === "list_item_open") {
        const nextToken = tokens[i + 1];

        if (nextToken && nextToken.type === "paragraph_open") {
          const inlineToken = tokens[i + 2];

          if (
            inlineToken &&
            inlineToken.type === "inline" &&
            inlineToken.children
          ) {
            const textRuns = processInlineContent(inlineToken.children);

            let bulletText = "";
            if (listType === "bullet") {
              bulletText = "• ";
            } else if (listType === "ordered") {
              bulletText = `${orderedCounter}. `;
              orderedCounter++;
            }

            paragraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: bulletText,
                    font: DOCX_STYLES.fonts.body,
                  }),
                  ...textRuns,
                ],
                spacing: { before: 50, after: 50 },
                indent: { left: 720 },
              })
            );

            i = i + 4;
          }
        }
      } else if (token.type === "blockquote_open") {
        //Find the Blockquote content

        const nextToken = tokens[i + 1];
        if (nextToken && nextToken.type === "paragraph_open") {
          const inlineToken = tokens[i + 2];

          if (inlineToken && inlineToken.type === "inline") {
            paragraphs.push(
              new Paragraph({
                children: [
                  new TextRun({
                    text: inlineToken.content,
                    italics: true,
                    color: "666666",
                    font: DOCX_STYLES.fonts.body,
                  }),
                ],
                spacing: { before: 200, after: 200 },
                indent: { left: 720 },
                alignment: AlignmentType.JUSTIFIED,
                border: {
                  left: {
                    color: "4F46E5",
                    space: 1,
                    style: "single",
                    size: 24,
                  },
                },
              })
            );
            i = i + 4;
          }
        }
      } else if (token.type === "code_block" || token.type === "fence") {
        paragraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: token.content,
                font: "Courier New",
                size: 20,
                color: "333333",
              }),
            ],
            spacing: { before: 200, after: 200 },
            shading: {
              fill: "F5F5F5",
            },
          })
        );
      } else if (token.type === "hr") {
        paragraphs.push(
          new Paragraph({
            text: "",
            border: {
              bottom: {
                color: "CCCCCC",
                space: 1,
                value: "single",
                size: 6,
              },
            },
            spacing: { before: 200, after: 200 },
          })
        );
      }
    } catch (TokenError) {
      console.error(`Error Processing token:`, token.type, TokenError);
      continue;
    }
  }

  return paragraphs;
};

//Process inline content (bold , italic , text)
export const processInlineContent = (children) => {
  const textRuns = [];
  let currentFormatting = { bold: false, italics: false };
  let textBuffer = "";

  const flushText = () => {
    if (textBuffer.trim()) {
      textRuns.push(
        new TextRun({
          text: textBuffer,
          bold: currentFormatting.bold,
          italics: currentFormatting.italics,
          font: DOCX_STYLES.fonts.body,
          size: DOCX_STYLES.sizes.body * 2,
        })
      );
      textBuffer = "";
    }
  };

  children.forEach((child) => {
    if (child.type === "strong_open") {
      flushText();
      currentFormatting.bold = true;
    } else if (child.type === "strong_close") {
      flushText();
      currentFormatting.bold = false;
    } else if (child.type === "em_open") {
      flushText();
      currentFormatting.italics = true;
    } else if (child.type === "em_close") {
      flushText();
      currentFormatting.italics = false;
    } else if (child.type === "text") {
      textBuffer += child.content;
    }
  });

  flushText();

  return textRuns;
};

export const exportAsDocument = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not Found" });
    }

    if (book.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    const sections = [];

    //Cover Page with image if available
    const coverPage = [];

    if (book.coverImage && !book.coverImage.includes("pravatar")) {
      const imagePath = book.coverImage.substring(1);

      try {
        if (fs.existsSync(imagePath)) {
          const imageBuffer = fs.readFileSync(imagePath);

          //Add some top spacing
          coverPage.push(
            new Paragraph({
              text: "",
              spacing: { before: 1000 },
            })
          );

          //Add image centered on the page
          coverPage.push(
            new Paragraph({
              children: [
                new ImageRun({
                  data: imageBuffer,
                  transformation: {
                    width: 400,
                    height: 550,
                  },
                }),
              ],

              alignment: AlignmentType.CENTER,
              spacing: { before: 200, after: 400 },
            })
          );

          // Page break after Cover
          coverPage.push(
            new Paragraph({
              text: "",
              pageBreakBefore: true,
            })
          );
        }
      } catch (imgErr) {
        console.error(`Could not embed image: ${imagePath}`, imgErr);
      }
    }

    sections.push(...coverPage);

    //Title Page Section
    const titlePage = [];

    // Main title
    titlePage.push(
      new Paragraph({
        children: [
          new TextRun({
            text: book.title,
            bold: true,
            font: DOCX_STYLES.fonts.heading,
            size: DOCX_STYLES.sizes.title * 2,
            color: "1A202C",
          }),
        ],

        alignment: AlignmentType.CENTER,
        spacing: { before: 2000, after: 400 },
      })
    );

    //Subtitle if exists
    if (book.subtitle && book.subtitle.trim()) {
      titlePage.push(
        new Paragraph({
          children: [
            new TextRun({
              text: book.subtitle,
              font: DOCX_STYLES.fonts.heading,
              size: DOCX_STYLES.sizes.subtitle * 2,
              color: "4A5568",
            }),
          ],

          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        })
      );
    }

    // Author
    titlePage.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `by ${book.author}`,
            font: DOCX_STYLES.fonts.heading,
            size: DOCX_STYLES.sizes.author * 2,
            color: "2D3748",
          }),
        ],

        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      })
    );

    //Decorative line
    titlePage.push(
      new Paragraph({
        text: "",
        border: {
          bottom: {
            color: "4F46E5",
            space: 1,
            value: "single",
            size: 12,
          },
        },
        alignment: AlignmentType.CENTER,
        spacing: { before: 400 },
      })
    );

    sections.push(...titlePage);

    //Process Chapters
    book.chapters.forEach((chapter, index) => {
      try {
        //Page Break Before each chapter except the first one
        if (index > 0) {
          sections.push(
            new Paragraph({
              text: "",
              page,
            })
          );
        }

        //Chapter Title
        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: chapter.title,
                bold: true,
                font: DOCX_STYLES.fonts.heading,
                size: DOCX_STYLES.sizes.chapterTitle * 2,
                color: "1A202C",
              }),
            ],

            spacing: {
              before: DOCX_STYLES.spacing.chapterBefore,
              after: DOCX_STYLES.spacing.chapterAfter,
            },
          })
        );

        //Chapter Content
        const contentParagraphs = processMarkdownToDocx(chapter.content || "");
        sections.push(...contentParagraphs);
      } catch (ChapterError) {
        console.error(`Error Processing Chapter ${index}:`, ChapterError);
      }
    });

    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 1440,
                right: 1440,
                bottom: 1440,
                left: 1440,
              },
            },
          },
          children: sections,
        },
      ],
    });

    // Generate the document buffer
    const buffer = await Packer.toBuffer(doc);

    //send the document as a download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    res.setHeader(
      "content-disposition",
      `attachment; filename=${book.title.replace(/[^a-zA-Z0-9]/g, "_")}.docx`
    );

    res.setHeader("Content-Length", buffer.length);

    res.send(buffer);
  } catch (error) {
    console.error("Error exporting document:", error);

    if (!res.headersSent) {
      res.status(500).json({
        message: "Server Error During Document Export",
        error: error.message,
      });
    }
  }
};
