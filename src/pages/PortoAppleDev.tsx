import React, { useState, useRef } from "react";
import dummyData from "../apple_porto_dummy.json";
import { useReactToPrint } from "react-to-print";

// Reusable layout exclusively for the print version
const PortoLayout = ({ project, index, total }: any) => {
  return (
    <div
      className="bg-white text-gray-900 font-sans p-12 flex flex-col w-[297mm] h-[209mm] box-border overflow-hidden mx-auto"
      style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}
    >
      <div className="flex-1 flex flex-row gap-16 mb-12 min-h-0">
        {/* Left Sidebar */}
        <div className="w-64 flex-shrink-0 flex flex-col space-y-10">
          <div>
            <h3 className="font-bold text-gray-800 text-[15px]">Artwork/Project Title</h3>
            <p className="text-gray-500 text-[13px] mt-1 italic">{project.title}</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-[15px]">Year Accomplished</h3>
            <p className="text-gray-500 text-[13px] mt-1 italic">{project.year}</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-[15px]">Role/Position</h3>
            <p className="text-gray-500 text-[13px] mt-1 leading-tight italic">
              {project.role}
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-[15px]">Publication Link</h3>
            <p className="text-blue-500 text-[13px] mt-1 leading-tight block break-all italic m-0">
              {project.link}
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Header inside main content */}
          <div className="flex justify-between items-start mb-8">
            <div className="max-w-3xl pr-8">
              <h3 className="font-bold text-gray-800 text-[15px]">Artwork/Project Description</h3>
              <p className="text-gray-500 text-[13px] mt-2 leading-relaxed">
                {project.description}
              </p>
            </div>
            <div className="flex items-center gap-3 mt-1 flex-shrink-0">
              <div className="text-gray-400 text-[13px] whitespace-nowrap font-medium">
                Page {index + 1} of {total}
              </div>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="relative flex-1 bg-[#e6e6e6] flex flex-col items-center justify-center text-center overflow-hidden rounded-md min-h-0">
            {project.imageUrl ? (
              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
            ) : (
              <div className="p-8">
                <h2 className="font-bold text-[18px] text-black mb-4 tracking-wide">Artwork/project photo/picture</h2>
                <p className="text-gray-600 text-[13px] max-w-2xl italic mb-4 leading-relaxed mx-auto">
                  Photo or picture that shows craftsmanship and command of techniques, whether<br />
                  digital or handmade, with careful attention to detail while understanding materials and/<br />
                  or media to enhance the design concept.
                </p>
                <p className="text-gray-600 text-[13px] max-w-xl italic mx-auto">
                  Screenshots of scenes & link to your online publication are required if<br />
                  your portfolio is a video.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="border-t-[1.5px] border-gray-300 pt-6 mt-auto flex-shrink-0">
        <div className="flex flex-row justify-between gap-6">
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 text-[14px]">Your name</h4>
            <p className="text-gray-500 text-[13px] mt-1">Stalis Ahmad Sholeh</p>
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 text-[14px]">Politeknik Elektronika Negeri Surabaya</h4>
            <h4 className="font-bold text-gray-900 text-[14px] mb-1">(Student)</h4>
            <p className="text-gray-500 text-[12px] leading-tight">
              Semester 6
            </p>
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 text-[14px]">Your contact information</h4>
            <p className="text-gray-500 text-[12px] mt-1 leading-tight">
              +62 831-1124-7317<br />
              salisahamd48@gmail.com<br />
              linkedin.com/in/salisahmaddd
            </p>
          </div>
          <div className="flex-1">
            <p className="text-gray-500 text-[13px]">Portfolio Submission for</p>
            <h4 className="font-bold text-gray-900 text-[15px] mt-1 leading-tight">
              Apple Developer Academy<br />Indonesia
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

const PortoAppleDev = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const project = dummyData[currentIndex] as any;

  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "Portfolio_Apple_Developer_Academy",
    pageStyle: `
      @page {
        size: A4 landscape;
        margin: 0mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `
  });

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % dummyData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + dummyData.length) % dummyData.length);
  };

  return (
    <div className="relative min-h-screen bg-gray-50 pt-4">
      {/* Viewport Render (Visible to user) */}
      <div className="min-h-screen bg-white text-gray-900 font-sans p-8 md:p-12 flex flex-col max-w-[1400px] mx-auto shadow-md rounded-md">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => handlePrint()}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Export All to PDF
          </button>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row gap-8 lg:gap-16 mb-12">
          {/* Left Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0 flex flex-col space-y-10">
            <div>
              <h3 className="font-bold text-gray-800 text-[15px]">Artwork/Project Title</h3>
              <p className="text-gray-500 text-[13px] mt-1 italic">{project.title}</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-[15px]">Year Accomplished</h3>
              <p className="text-gray-500 text-[13px] mt-1 italic">{project.year}</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-[15px]">Role/Position</h3>
              <p className="text-gray-500 text-[13px] mt-1 leading-tight italic">
                {project.role}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-[15px]">Publication Link</h3>
              <a href={project.link} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-[13px] mt-1 leading-tight block break-all italic">
                {project.link}
              </a>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Top Header inside main content */}
            <div className="flex justify-between items-start mb-8">
              <div className="max-w-3xl pr-8">
                <h3 className="font-bold text-gray-800 text-[15px]">Artwork/Project Description</h3>
                <p className="text-gray-500 text-[13px] mt-2 leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <button
                  onClick={handlePrev}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                  aria-label="Previous Project"
                >
                  &lt;
                </button>
                <div className="text-gray-400 text-[13px] whitespace-nowrap font-medium">
                  Page {currentIndex + 1} of {dummyData.length}
                </div>
                <button
                  onClick={handleNext}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                  aria-label="Next Project"
                >
                  &gt;
                </button>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="relative flex-1 bg-[#e6e6e6] flex flex-col items-center justify-center text-center min-h-[500px] overflow-hidden rounded-md">
              {project.imageUrl ? (
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
              ) : (
                <div className="p-8">
                  <h2 className="font-bold text-[18px] text-black mb-4 tracking-wide">Artwork/project photo/picture</h2>
                  <p className="text-gray-600 text-[13px] max-w-2xl italic mb-4 leading-relaxed">
                    Photo or picture that shows craftsmanship and command of techniques, whether<br />
                    digital or handmade, with careful attention to detail while understanding materials and/<br />
                    or media to enhance the design concept.
                  </p>
                  <p className="text-gray-600 text-[13px] max-w-xl italic">
                    Screenshots of scenes & link to your online publication are required if<br />
                    your portfolio is a video.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="border-t-[1.5px] border-gray-300 pt-6 mt-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-12">
            <div>
              <h4 className="font-bold text-gray-900 text-[14px]">Stalis Ahmad Sholeh</h4>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-[14px]">Politeknik Elektronika Negeri Surabaya</h4>
              <h4 className="font-bold text-gray-900 text-[14px] mb-1">(Student)</h4>
              <p className="text-gray-500 text-[12px] leading-tight">
                Semester 6
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-[14px]">Your contact information</h4>
              <p className="text-gray-500 text-[12px] mt-1 leading-tight">
                +62 831-1124-7317<br />
                salisahamd48@gmail.com<br />
                <a href="https://www.linkedin.com/in/salisahmaddd/" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-[13px] leading-tight block break-all">linkedin.com/in/salisahmaddd</a>
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-[13px]">Portfolio Submission for</p>
              <h4 className="font-bold text-gray-900 text-[15px] mt-1 leading-tight">
                Apple Developer Academy<br />Indonesia
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Print Container */}
      <div className="hidden">
        <div ref={contentRef} className="print:block">
          {dummyData.map((proj, index) => (
            <div key={proj.id} style={{ pageBreakAfter: 'always' }}>
              <PortoLayout project={proj} index={index} total={dummyData.length} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortoAppleDev;
