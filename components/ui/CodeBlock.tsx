import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Icon } from "@iconify/react"; // Iconify komponentini import qiling

// Iconify ikonka nomlarini til nomlariga moslashtirish
// Siz icon-sets saytidan (masalan, icon-sets.iconify.design) kerakli ikonkalarning nomlarini topishingiz mumkin.
const languageIconNames: { [key: string]: string | null } = {
  javascript: "ph:file-javascript", // Phosphor Icons - File Javascript
  js: "ph:file-javascript",
  html: "ph:file-html", // Phosphor Icons - File Html
  css: "ph:file-css", // Phosphor Icons - File Css
  python: "ph:file-python", // Phosphor Icons - File Python
  php: "ph:file-php", // Phosphor Icons - File Php
  java: "ph:file-java", // Phosphor Icons - File Java
  typescript: "ph:file-ts", // Phosphor Icons - File Typescript
  ts: "ph:file-ts",
  json: "ph:file-json", // Phosphor Icons - File Json
  jsx: "ph:file-jsx", // Phosphor Icons - File JSX
  tsx: "ph:file-tsx", // Phosphor Icons - File TSX
  // Kerakli boshqa tillar uchun ikonka nomlarini qo'shing
  // Misol uchun:
  // csharp: 'devicon:csharp',
  // cpp: 'devicon:cplusplus',
  // ruby: 'devicon:ruby',
};

// Til nomiga mos ikonka nomini qaytaradigan funksiya
function getLanguageIconName(lang: string): string | null {
  return languageIconNames[lang.toLowerCase()] || null; // Agar topilmasa, null qaytaradi
}

// Kod qismining stili
const customCodeStyle = {
  ...materialDark,
  'pre[class*="language-"]': {
    ...materialDark['pre[class*="language-"]'],
    // Rasmdagi fonga yaqin rang
    backgroundColor: "#2d2d2d", // Misol uchun
    padding: "1em",
    marginTop: "0",
    marginBottom: "0",
    borderRadius: "0 0 0.5em 0.5em",
    fontSize: "0.9em", // Shrift o'lchamini kichikroq qilamiz
    overflowX: "auto",
    fontFamily: "'Fira Code', monospace", // Estetikroq kod shrifti (agar o'rnatilgan bo'lsa)
    lineHeight: "1.5", // Satr oralig'ini qo'shamiz
  },
  code: {
    ...(materialDark.code || {}),
    backgroundColor: "transparent",
  },
};

interface CodeBlockProps {
  language: string;
  value: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2 soniyadan keyin 'Copied!' yozuvini qaytaradi
    } catch (err) {
      console.error("Failed to copy code: ", err);
      // Xatolik haqida foydalanuvchiga xabar berish mumkin
    }
  };

  const iconName = getLanguageIconName(language);

  return (
    <div
      className="rounded-lg overflow-hidden my-4"
      style={{ backgroundColor: "#2d2d2d" }}
    >
      {/* Sarlavha qismi */}
      <div
        className="flex items-center justify-between px-4 py-2 text-gray-300 text-xs font-sans border-b border-gray-600"
        style={{ backgroundColor: "#3b4252" }}
      >
        <div className="flex items-center gap-2">
          {/* Iconify komponentini ishlatish */}
          {iconName && (
            <span className="flex-shrink-0 text-sm">
              <Icon icon={iconName} />
            </span>
          )}
          <span className="font-medium capitalize">{language}</span>
        </div>
        {/* Copy tugmasi */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none text-xs"
        >
          {/* Iconify komponentini ishlatish */}
          {copied ? (
            <Icon icon="ph:check-circle" />
          ) : (
            <Icon icon="ph:copy" />
          )}{" "}
          {/* Check va Copy ikonkalarini Iconifydan olish */}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      {/* Syntax highlighted kod qismi */}
      <SyntaxHighlighter
        style={customCodeStyle}
        language={language}
        PreTag="pre"
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
