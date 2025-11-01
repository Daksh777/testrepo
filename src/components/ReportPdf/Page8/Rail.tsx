import { ChildData } from "../report.types";
import { formatNumber } from "../utils";

const Rail = ({ data }: ChildData) => {
  return (
    <div>
      {" "}
      <div className="flex flex-row">
        <div className="bg-dark-blue px-4 py-2 text-white flex-grow font-medium">
          Rail
        </div>
        <div className="bg-base-green  w-[160px] text-dark-blue py-2 text-center">
          Score:{" "}
          <span className="font-medium">{formatNumber(data?.["8E"])}/100</span>
        </div>
      </div>
      <div className="h-[220px] flex flex-row mt-4 justify-center ">
        <div className="flex flex-col w-[114px]">
          <div className="h-[90px] w-full flex justify-center items-center">
            <svg
              width={74}
              height={59}
              viewBox="0 0 74 59"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 29.538c.324-.339.619-.712.977-1.01a37982 37982 0 0 1 31.888-26.56c2.382-1.98 5.232-1.965 7.622.026 3.336 2.778 6.661 5.568 9.993 8.352.179.15.368.285.667.516.018-.345.045-.588.045-.832.003-2.458-.001-4.914.003-7.37.004-1.569.473-2.025 2.061-2.026h7.516c1.672.001 2.092.413 2.092 2.054 0 5.748.008 11.498-.015 17.246-.001.538.176.866.579 1.197 2.967 2.438 5.915 4.898 8.87 7.35q.195.158.38.325c.79.721.875 1.49.203 2.325a105 105 0 0 1-2.529 3.015c-.768.884-1.572.93-2.488.166Q55.386 23.917 42.909 13.517c-2.068-1.724-4.137-3.446-6.248-5.203l-5.397 4.493Q18.374 23.55 5.483 34.29c-.976.814-1.76.75-2.587-.229C1.916 32.9.964 31.714 0 30.54z"
                fill="#7CAC2B"
              />
              <path
                d="M30.867 41.436v17.432h-.828l-16.252-.002c-2.139-.001-3.328-1.187-3.328-3.312-.001-6.99.005-13.979-.013-20.968-.002-.536.173-.865.58-1.2 8.35-6.86 16.69-13.73 25.015-20.619.477-.394.762-.394 1.24 0a9964 9964 0 0 0 25.014 20.62c.407.332.583.663.581 1.198-.018 7.061-.009 14.123-.015 21.184-.002 1.808-1.236 3.085-3.04 3.09-5.631.018-11.263.007-16.895.006-.115 0-.23-.018-.444-.035V41.436z"
                fill="#7CAC2B"
              />
            </svg>
          </div>
          <div className="h-1 w-full bg-base-green"></div>
          <div className="mt-4 flex flex-col items-center">
            <div className="text-dark-blue text-sm">
              This area
              <sup>2</sup>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[152px]">
          <div className="h-[90px] w-full flex justify-center items-center">
            <svg
              width={118}
              height={12}
              viewBox="0 0 118 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 6.027h108.389"
                stroke="#002147"
                strokeWidth={2.667}
                strokeMiterlimit={10}
              />
              <path d="M117.622 6.027 103.326.825V11.23z" fill="#002147" />
            </svg>
          </div>
          <div className="h-1 w-full bg-dark-blue"></div>
          <div className="mt-4 flex flex-col items-center text-xs">
            <div className="text-dark-blue h-10">
              {formatNumber(data?.["8E2"], 1)} miles
            </div>
            <div className="text-dark-blue">
              {formatNumber(data?.["8E3"], 1)} miles
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[98px]">
          <div className="h-[90px] w-full flex justify-center items-center">
            <svg
              width={64}
              height={62}
              viewBox="0 0 64 62"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M58.66 33.267V4.655h-8.814v2.132c.176.012.375.036.575.036 1.296.004 2.593-.01 3.89.008 1.171.017 2.131.941 2.142 2.094q.032 3.407 0 6.815c-.01 1.155-.967 2.088-2.144 2.09q-6.74.021-13.479 0c-1.204-.002-2.142-.955-2.15-2.156a529 529 0 0 1 0-6.68c.008-1.24.946-2.154 2.21-2.166 1.455-.012 2.91-.003 4.457-.003 0-1.342.076-2.646-.02-3.938-.123-1.69 1.047-2.73 2.703-2.699 4.213.081 8.43.025 12.644.028 1.577 0 2.459.863 2.459 2.412v59.234H38.675V35.775c0-1.667.837-2.506 2.5-2.507q8.304-.002 16.607 0zM.869 21.113C.869 16.409.866 11.703.87 7 .873 3.088 3.758.218 7.694.216q10.98-.006 21.957 0c3.896.004 6.791 2.876 6.794 6.745q.007 14.183 0 28.363c-.003 3.873-2.894 6.748-6.788 6.75q-11.013.009-22.027 0C3.783 42.07.875 39.18.87 35.364c-.007-4.751 0-9.5 0-14.251m15.566-7.683c0-1.421.014-2.842-.004-4.264-.016-1.397-.949-2.334-2.353-2.341a926 926 0 0 0-8.605-.001c-1.45.006-2.376.934-2.382 2.38q-.018 4.23 0 8.458c.006 1.436.943 2.374 2.387 2.38q4.267.017 8.536 0c1.49-.005 2.41-.93 2.42-2.417.01-1.399.001-2.797.001-4.195m17.792.075c0-1.421.008-2.843-.002-4.264-.01-1.485-.932-2.412-2.419-2.417q-4.234-.015-8.468-.002c-1.539.004-2.453.915-2.457 2.447q-.01 4.16 0 8.32c.004 1.527.924 2.45 2.453 2.455q4.232.013 8.467-.002c1.492-.005 2.412-.928 2.424-2.412.01-1.376.002-2.75.002-4.125M8.67 24.452c-1.792-.014-3.328 1.482-3.354 3.266-.025 1.772 1.476 3.303 3.28 3.342 1.812.038 3.387-1.496 3.388-3.303.002-1.78-1.514-3.292-3.314-3.305M32 27.784c.02-1.775-1.486-3.3-3.289-3.332-1.785-.032-3.336 1.454-3.38 3.24-.044 1.793 1.503 3.36 3.324 3.368 1.793.008 3.325-1.492 3.345-3.276m4.425 34.1H.868l2.086-5.048C4.61 52.837 6.273 48.84 7.91 44.835c.177-.434.39-.563.853-.562 6.6.016 13.199.012 19.799.008.359-.001.625 0 .801.432 2.302 5.618 4.627 11.224 6.946 16.834.034.082.06.169.117.337m-6.9-4.404c-.247-.615-.44-1.2-.721-1.74-.106-.202-.41-.415-.632-.424-1.04-.044-2.083-.02-3.124-.02-5.255 0-10.511-.003-15.766.01-.238 0-.609.083-.69.242-.311.602-.528 1.253-.8 1.932zm-2.015-6.62c-.344-.692-.638-1.334-.986-1.946-.074-.13-.336-.218-.512-.218q-7.36-.018-14.72 0c-.175 0-.432.097-.507.23-.347.61-.641 1.25-.981 1.934z"
                fill="#7CAC2B"
              />
            </svg>
          </div>
          <div className="h-1 w-full bg-base-green"></div>
          <div className="mt-4 flex flex-col items-center text-xs px-2 ">
            <div className="text-dark-blue h-10 text-center">
              {data?.["8E4"]}
            </div>
            <div className="text-dark-blue text-center">{data?.["8E5"]}</div>
          </div>
        </div>
        <div className="flex flex-col w-[158px]">
          <div className="h-[90px] w-full flex justify-center items-center">
            <svg
              width={118}
              height={12}
              viewBox="0 0 118 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M.378 6.027h108.389"
                stroke="#002147"
                strokeWidth={2.667}
                strokeMiterlimit={10}
              />
              <path d="M118 6.027 103.704.825V11.23z" fill="#002147" />
            </svg>
          </div>
          <div className="h-1 w-full bg-dark-blue"></div>
          <div className="mt-4 flex flex-col items-center text-xs px-2 ">
            <div className="text-dark-blue h-10 text-center">
              {data?.["8E6"]} minutes
              <br />
              {data?.["8E7"]} departures
            </div>
            <div className="text-dark-blue text-center">
              {data?.["8E8"]} minutes
              <br />
              {data?.["8E9"]} departures
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[102px]">
          <div className="h-[90px] w-full flex justify-center items-center flex-col gap-y-2">
            <svg
              width={54}
              height={53}
              viewBox="0 0 54 53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M.472 49.824h3.903V19.496h13.453v30.295h3.106V12.555h3.449V5.64h3.927V.091h3.104v5.525h3.912v6.923h3.46v17.655H28.464v19.598h2.99V33.346h17.754v16.466h3.92v3.11H.472zm34.876-.034h3.042V37.456h-3.042zm6.986.01h2.969V37.442h-2.97zM28.38 12.506h3.004V9.482H28.38zm-15.813 10.82H9.56v3.022h3.007zM24.92 26.35h2.982v-3.039H24.92zM9.554 48.564h3.012v-3.02H9.554zm15.362-29.128h2.99v-3.048h-2.99zM34.8 16.41h-2.985v3.03H34.8zm-.001 6.898h-2.984v3.055h2.984zM9.554 33.754h3.012V30.74H9.554zm3.012 4.412H9.543v2.97h3.023z"
                fill="#7CAC2B"
              />
            </svg>
          </div>
          <div className="h-1 w-full bg-base-green"></div>
          <div className="mt-4 flex flex-col items-center text-xs px-2 ">
            <div className="text-dark-blue min-h-10 max-h-12 text-center leading-3">
              {data?.["8E10"]}
            </div>
            <div className="text-dark-blue text-center leading-3">
              {data?.["8E11"]}
            </div>
            <div className="text-dark-blue text-center">{data?.["8E13"]}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rail;
