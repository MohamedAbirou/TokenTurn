"use client";
import TooltipHelp from "@/components/TooltipHelp";
import NotificationModal from "@/components/modals/NotificationModal";
import { InviteLinkModal } from "@/components/modals/invite-link-modal";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";
import axios from "axios";
import {
  Bell,
  ChevronDown,
  ChevronUp,
  CornerRightDown,
  CornerRightUp,
  HelpCircle,
  Info,
  Share,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IParams {
  coinId: string;
}

interface CoinData {
  id: string;
  name: string;
  image: { thumb: string };
  symbol: string;
  market_cap_rank: number;
  market_data: {
    current_price: { usd: number; btc: number };
    market_cap: { usd: number };
    price_change_percentage_24h: number;
    price_change_percentage_24h_in_currency: { usd: number; btc: number };
    total_volume: { usd: number };
    fully_diluted_valuation: { usd: number };
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    low_24h: { usd: number };
    high_24h: { usd: number };
  };
  watchlist_portfolio_users: number;
}

const CoinIdPage = ({ params }: { params: IParams }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [showFDV, setShowFDV] = useState(false);
  const { onOpen } = useModal();
  const [coinData, setCoinData] = useState<CoinData | null>(null);

  const fetchCoinData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${params.coinId}`
      );

      const bitcoinData = await axios.get(
        "https://api.coingecko.com/api/v3/coins/bitcoin"
      );
      const bitcoinPrice = bitcoinData.data.market_data.current_price.usd;

      data.market_data.current_price.btc =
        data.market_data.current_price.usd / bitcoinPrice;

      setCoinData(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const {
    id,
    name,
    image,
    symbol,
    market_cap_rank,
    market_data,
    watchlist_portfolio_users,
  } = coinData || {};

  const toggleFDV = () => {
    setShowFDV((prevState) => !prevState);
  };

  useEffect(() => {
    fetchCoinData();
    setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isMounted) {
    return null;
  }

  const formatted_price = (item: number | undefined) => {
    const price = item?.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    return price;
  };

  const icon =
    market_data?.price_change_percentage_24h! > 0 ? (
      <ChevronUp className="w-5 h-5 mr-1" />
    ) : (
      <ChevronDown className="w-5 h-5 mr-1" />
    );

  const currency_perc_icon =
    market_data?.price_change_percentage_24h_in_currency?.btc! >= 0 ? (
      <CornerRightUp className="w-4 h-4 ml-1" />
    ) : (
      <CornerRightDown className="w-4 h-4 ml-1" />
    );

  const proportion =
    market_data?.market_cap?.usd! / market_data?.fully_diluted_valuation?.usd!;

  const low = market_data?.low_24h.usd!;
  const high = market_data?.high_24h.usd!;
  const current = market_data?.current_price.usd!;
  const price_progress = ((current - low) / (high - low)) * 100;

  return (
    <div className="flex items-start flex-col flex-1 space-y-5">
      <span className="px-3 py-1 bg-black text-white text-sm rounded-md">
        Rank #{market_cap_rank}
      </span>
      <div className="flex items-center">
        <Image
          src={image?.thumb!}
          className="mr-3"
          width={32}
          height={32}
          alt="coin image"
        />
        <h1 className="font-bold mr-2 text-3xl">{name}</h1>
        <span className="text-muted-foreground text-xl pt-1.5">
          {symbol?.toUpperCase()}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <p className="font-bold text-2xl">
          {formatted_price(market_data?.current_price.usd)}
        </p>
        <div
          className={`flex items-center ${
            market_data?.price_change_percentage_24h! > 0
              ? "text-green-500"
              : "text-red-600"
          }`}
        >
          {icon}
          {market_data?.price_change_percentage_24h?.toFixed(2)}%
        </div>
        <TooltipHelp Icon={<Info className="w-5 h-5 ml-2" />} className="w-60">
          <p className="font-bold pb-3">
            How is the price of {name} ({symbol?.toUpperCase()}) calculated?
          </p>
          <p>
            The price of {name} ({symbol?.toUpperCase()}) is calculated in
            real-time by aggregating the latest data across 222 exchanges and
            5129 markets, using a global volume-weighted average formula. Learn
            more about how{" "}
            <Link
              href="https://www.coingecko.com/en/methodology"
              className="text-emerald-500"
            >
              crypto prices are calculated
            </Link>{" "}
            on CoinGecko.
          </p>
        </TooltipHelp>
      </div>

      <div className="flex items-center">
        <p key={id}>{market_data?.current_price.btc.toFixed(8)} BTC</p>
        <div
          className={`flex items-center ml-4 text-sm ${
            market_data?.price_change_percentage_24h_in_currency?.btc! > 0
              ? "text-green-500"
              : "text-red-600"
          }`}
        >
          {market_data?.price_change_percentage_24h_in_currency?.btc?.toFixed(
            2
          )}
          %{currency_perc_icon}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <InviteLinkModal coinId={params.coinId} />
        <TooltipHelp
          Button={
            <Button
              onClick={() => onOpen("invite")}
              variant="ghost"
              size="sm"
              className="border-2 border-zinc-200"
            >
              <Share className="w-5 h-5" />
            </Button>
          }
        >
          <p>Share</p>
        </TooltipHelp>
        <NotificationModal />
        <Button
          variant="ghost"
          onClick={() => onOpen("notification")}
          size="sm"
          className="border-2 border-zinc-200"
        >
          <Bell className="w-5 h-5" />
        </Button>
        <TooltipHelp
          Button={
            <Button
              variant="ghost"
              size="sm"
              className="border-2 border-zinc-200"
            >
              <Star className="w-5 h-5" />
            </Button>
          }
        >
          <p>Add to Portfolio and track coin price</p>
        </TooltipHelp>
        <span className="flex items-center px-3 py-1 bg-zinc-200 text-black text-sm rounded-md">
          <Star className="w-4 h-4 mr-2" />
          On {watchlist_portfolio_users?.toLocaleString()} watchlists
        </span>
      </div>

      <div className="flex items-center flex-col w-full max-w-lg">
        <Progress value={price_progress} />
        <div className="flex items-center justify-between w-full text-sm mt-2 font-medium">
          <p>{formatted_price(market_data?.low_24h.usd)}</p>
          <p>24h range</p>
          <p>{formatted_price(market_data?.high_24h.usd)}</p>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-10 pt-10 pb-10">
        <div>
          <div className="flex items-center justify-between py-3">
            <p className="flex items-center">
              Market Cap:
              <TooltipHelp
                Icon={<HelpCircle className="w-4 h-4 ml-2" />}
                className="w-72"
              >
                <p className="pb-3">
                  Market Cap = Current Price x Circulating Supply
                </p>
                <p className="pb-3">
                  Refers to the total market value of a cryptocurrency’s
                  circulating supply. It is similar to the stock market’s
                  measurement of multiplying price per share by shares readily
                  available in the market (not held & locked by insiders,
                  governments)
                </p>
                <Link
                  href="https://www.coingecko.com/en/methodology"
                  className="text-emerald-500"
                >
                  Read More
                </Link>
              </TooltipHelp>
            </p>
            <div className="flex items-center">
              <p className="mr-2">
                {formatted_price(market_data?.market_cap?.usd)}
              </p>
              {showFDV && (
                <ChevronUp
                  className="w-5 h-5 cursor-pointer"
                  onClick={toggleFDV}
                />
              )}
              {!showFDV && (
                <ChevronDown
                  className="w-5 h-5 cursor-pointer"
                  onClick={toggleFDV}
                />
              )}
            </div>
          </div>
          <Separator />
          {showFDV && (
            <>
              <div className="flex items-center justify-between py-3">
                <p className="flex items-center">
                  Market Cap / FDV:
                  <TooltipHelp
                    Icon={<HelpCircle className="w-4 h-4 ml-2" />}
                    className="w-72"
                  >
                    <p className="pb-3">
                      The proportion of current market capitalization compares
                      to market capitalization when meeting max supply.
                    </p>
                    <p className="pb-3">
                      The closer the Mkt Cap/FDV to 1, the closer the current
                      market capitalization to its fully diluted valuation and
                      vice versa.
                    </p>
                    <Link
                      href="https://www.coingecko.com/learn/what-is-fully-diluted-valuation-fdv-in-crypto"
                      className="text-emerald-500"
                    >
                      Learn more about Mkt Cap/FDV here.
                    </Link>
                  </TooltipHelp>
                </p>
                <p>{proportion.toFixed(2)}</p>
              </div>
              <Separator />
            </>
          )}
          <div className="flex items-center justify-between py-3">
            <p className="flex items-center">
              24 Hour Trading Vol:
              <TooltipHelp
                Icon={<HelpCircle className="w-4 h-4 ml-2" />}
                className="w-72"
              >
                <p className="pb-3">
                  A measure of a cryptocurrency trading volume across all
                  tracked platforms in the last 24 hours. This is tracked on a
                  rolling 24-hour basis with no open/closing times.
                </p>
                <Link
                  href="https://www.coingecko.com/en/methodology"
                  className="text-emerald-500"
                >
                  Read More
                </Link>
              </TooltipHelp>
            </p>
            <p>{formatted_price(market_data?.total_volume?.usd)}</p>
          </div>
          <Separator />
          <div className="flex items-center justify-between py-3">
            <p className="flex items-center">
              Fully Diluted Valuation:
              <TooltipHelp
                Icon={<HelpCircle className="w-4 h-4 ml-2" />}
                className="w-72"
              >
                <p className="pb-3">
                  Fully Diluted Valuation (FDV) = Current Price x Total Supply
                </p>
                <p className="pb-3">
                  Fully Diluted Valuation (FDV) is the theoretical market
                  capitalization of a coin if the entirety of its supply is in
                  circulation, based on its current market price. The FDV value
                  is theoretical as increasing the circulating supply of a coin
                  may impact its market price. Also depending on the tokenomics,
                  emission schedule or lock-up period of a coin&apos;s supply,
                  it may take a significant time before its entire supply is
                  released into circulation.
                </p>
                <Link
                  href="https://www.coingecko.com/learn/what-is-fully-diluted-valuation-fdv-in-crypto"
                  className="text-emerald-500"
                >
                  Learn more about FDV here.
                </Link>
              </TooltipHelp>
            </p>
            <p>{formatted_price(market_data?.fully_diluted_valuation?.usd)}</p>
          </div>
          <Separator />
        </div>

        <div>
          <div className="flex items-center justify-between py-3">
            <p className="flex items-center">
              Circulating Supply:
              <TooltipHelp
                Icon={<HelpCircle className="w-4 h-4 ml-2" />}
                className="w-72"
              >
                <p className="pb-3">
                  The amount of coins that are circulating in the market and are
                  tradeable by the public. It is comparable to looking at shares
                  readily available in the market (not held & locked by
                  insiders, governments).
                </p>
                <Link
                  href="https://www.coingecko.com/en/methodology"
                  className="text-emerald-500"
                >
                  Read More
                </Link>
              </TooltipHelp>
            </p>
            <p>{market_data?.circulating_supply}</p>
          </div>
          <Separator />
          <div className="flex items-center justify-between py-3">
            <p className="flex items-center">
              Total Supply:
              <TooltipHelp
                Icon={<HelpCircle className="w-4 h-4 ml-2" />}
                className="w-72"
              >
                <p className="pb-3">
                  The amount of coins that have already been created, minus any
                  coins that have been burned (removed from circulation). It is
                  comparable to outstanding shares in the stock market.
                </p>
                <p>Total Supply = Onchain supply - burned tokens</p>
              </TooltipHelp>
            </p>
            <p>{market_data?.total_supply}</p>
          </div>
          <Separator />
          <div className="flex items-center justify-between py-3">
            <p className="flex items-center">
              Max Supply:
              <TooltipHelp
                Icon={<HelpCircle className="w-4 h-4 ml-2" />}
                className="w-72"
              >
                <p className="pb-3">
                  The maximum number of coins coded to exist in the lifetime of
                  the cryptocurrency. It is comparable to the maximum number of
                  issuable shares in the stock market.
                </p>
                <p>Max Supply = Theoretical maximum as coded</p>
              </TooltipHelp>
            </p>
            <p>{market_data?.max_supply}</p>
          </div>
          <Separator />
        </div>
      </div>
    </div>
  );
};

export default CoinIdPage;
