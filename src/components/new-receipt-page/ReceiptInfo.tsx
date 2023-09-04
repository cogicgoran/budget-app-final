import React, { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import classNames from "classnames";
import { DateTimePicker, pickersLayoutClasses } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {
  buttonBaseClasses,
  formControlClasses,
  iconClasses,
  inputAdornmentClasses,
  inputBaseClasses,
  outlinedInputClasses,
} from "@mui/material";
import { useReceiptContext } from "../../context/NewReceiptContext";
import SelectCustom from "../forms/SelectCustom";
import { IconCirclePlus } from "../icons/CirclePlus";
import { Link } from "react-router-dom";
import { PATHS } from "../../utils/constants";

function ReceiptInfo() {
  const { t } = useTranslation();
  const { marketplaces, currencies } = useReceiptContext();
  const textMarketplace = t("marketplace");
  const textDate = t("date");
  const textCurrency = t("currency");
  const textChoose = t("choose");
  const formMethods = useFormContext();

  const marketplaceOptions = marketplaces.map(({ id, address, name }) => ({
    value: id,
    label: `${name} ${address}`,
  }));

  const currencyOptions = currencies.map((currency) => ({
    value: currency.id,
    label: currency.code,
  }));

  const date = formMethods.watch("date");

  return (
    <div>
      <div className={classNames("flex items-center gap-1", "mb-1")}>
        <label htmlFor="marketplace">{textMarketplace}:</label>
        <SelectCustom name="marketplace" options={marketplaceOptions} />
        <Link to={PATHS.MARKETPLACES}>
          <IconCirclePlus className={classNames("w-[20px] h-[20px]")} />
        </Link>
      </div>
      <div className={classNames("flex items-center gap-1", "mb-1")}>
        <label htmlFor="date">{textDate}:</label>
        <DateTimePicker
          format="MMM DD, YYYY HH:mm"
          value={date}
          onChange={(value) => {
            formMethods.setValue("date", value);
          }}
          sx={{
            backgroundColor: "white",
            [`.${inputBaseClasses.input}`]: {
              padding: "3px",
              color: "#1a4e5b",
              width: "256px",
              ["::placeholder"]: {
                color: "#90c3d0",
                opacity: 1,
              },
            },
            [`.${inputAdornmentClasses.root}`]: {
              marginLeft: "unset",
              height: "unset",
            },
            [`.${inputBaseClasses.adornedEnd}`]: {
              fontSize: "20px",
              fontWeight: "normal",
              fontFamily: "unset",
              borderRadius: "unset",
              backgroundColor: "unset",
              paddingRight: "unset",
              [`.${buttonBaseClasses.root}`]: {
                color: "#1a4e5b",
                opacity: "0.8",
                margin: "2px",
                padding: "4px",
                " svg": {
                  width: "20px",
                  height: "20px",
                },
                ":hover": {
                  color: "#1a4e5b",
                  backgroundColor: "#90c3d0",
                  opacity: "1",
                },
              },
              [`.${outlinedInputClasses.notchedOutline}`]: {
                borderColor: "#90c3d0",
              },
            },
          }}
        />
      </div>
      <div className={classNames("flex items-center gap-1", "mb-1")}>
        <label htmlFor="currency">{textCurrency}:</label>
        <SelectCustom name="currency" options={currencyOptions} />
      </div>
    </div>
  );
}

export default ReceiptInfo;
