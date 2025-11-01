import { FC } from "react";
import { PropData } from "../report.types";
import Navbar from "../Navbar/Navbar";
import Thumbnail from "./thumbnail.png";
import Logos from "./Logos.png";

const Page11: FC<PropData> = ({ pageData }) => {
  return (
    <div className="pdf-page flex flex-col !break-after-avoid-page">
      <Navbar
        page={11}
        sector_code={pageData?.["1Xa"]}
        created_at={pageData?.["0A"]}
        reference={pageData?.["0B"]}
      />
      <div className="flex flex-row flex-grow">
        <div className="w-[460px] shrink-0">
          <div>
            <img
              src={Thumbnail}
              alt="thumbnail"
              width={460}
              height={330}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-8 w-[360px] mx-auto">
            <div className="text-dark-blue font-semibold text-xl border-b border-dark-blue pb-4">
              Sources
            </div>
            <div className="mt-8">
              <img
                src={Logos}
                alt="logos"
                width={360}
                height={360}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="bg-dark-blue flex-grow h-full px-10 py-10 text-white text-xs">
          <div className="font-semibold text-2xl">Disclaimers</div>
          <div className="flex flex-col gap-4 mt-6 text-xs">
            <div>Please see unmapt.io/disclaimers.</div>
            <div>
              The data contained in this report represent the best judgement of
              Unmapt based on a combination of public and proprietary sources.
              No warranty is given for the accuracy of the data and no liability
              shall be ascribed to Oxford Scientia for any flaws herein
            </div>
            <div>
              Much of this data is based on geographical information systems
              analysis. The geospatial unit is a clipped modification of the ONS
              Lower-layer Super Output Area (LSOA) in urban areas and the Output
              Area (OA) in rural areas.
            </div>
            <div>
              Much of the data in this report refers to a radius around the
              population centre of the neighbourhood.
            </div>
            <div>
              House prices here are the median over the four quarters ending in
              December 2024.
            </div>
            <div>
              Data are current to the {pageData?.["11A"]} or latest available.
            </div>
            <div>
              Every effort has been made to present accurate data, but data
              accuracy is not guaranteed.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page11;
