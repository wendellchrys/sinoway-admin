import { useSelector } from "react-redux";

const Default = ({ data }) => {
   const { settings } = useSelector(({ settings }) => settings);
   return (
      <>
         {settings.price_type ? (
            <>
               {settings.price_icon}
               {data.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </>
         ) : (
            <>
               {data.toLocaleString(undefined, { minimumFractionDigits: 2 })}
               {settings.price_icon}
            </>
         )}
      </>
   );
};

export default Default;
