"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ArrowDown, ArrowUp, ChevronDown, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LineChart from "@/components/LineChart";
import Image from "next/image";

interface CatalogProps {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  total_volume: number;
  market_cap: number;
  market_cap_rank: number;
  sparkline_in_7d: { price: number[] };
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  [key: string]: string | number | { price: number[] };
}

const Catalog = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [coins, setCoins] = useState<CatalogProps[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  }>({
    key: "",
    direction: "",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [coinsPerPage, setCoinsPerPage] = useState<number>(10);
  const [fetchedCoins, setFetchedCoins] = useState<CatalogProps[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&price_change_percentage=1h,24h,7d&sparkline=true&locale=en&days=7"
      );

      setFetchedCoins(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });

    const sortedCoins = [...coins];
    sortedCoins.sort((a, b) => {
      const valueA =
        typeof a[key] === "number" ? a[key] : String(a[key]).toLowerCase();
      const valueB =
        typeof b[key] === "number" ? b[key] : String(b[key]).toLowerCase();

      if (direction === "ascending") {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });

    setCoins(sortedCoins);
  };

  useEffect(() => {
    fetchData();
    setIsMounted(true);
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when a new search query is entered
  };

  useEffect(() => {
    const filterCoins = (coin: CatalogProps) => {
      const values = Object.values(coin).join("").toLowerCase();
      return values.includes(searchQuery.toLowerCase());
    };

    if (isMounted) {
      const indexOfLastCoin = currentPage * coinsPerPage;
      const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
      const slicedCoins = fetchedCoins
        .filter(filterCoins) // Apply filtering based on search query
        .slice(indexOfFirstCoin, indexOfLastCoin);
      setCoins(slicedCoins);
    }
  }, [currentPage, coinsPerPage, fetchedCoins, isMounted, searchQuery]);

  const totalPages = Math.ceil(fetchedCoins.length / coinsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  if (!isMounted) {
    return (
      <div className="flex items-center flex-col flex-1 space-y-3">
        <div className="flex items-center justify-between mb-5">
          <Skeleton className="w-[40%] h-10" />
          <Skeleton className="w-[10%] h-10" />
        </div>
        <div className="flex items-center flex-col">
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
        </div>
        <div className="flex items-center justify-between my-10">
          <Skeleton className="w-[15%] h-10" />
          <Skeleton className="w-[20%] h-10" />
          <Skeleton className="w-[15%] h-10" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-5">
        <Input
          placeholder="Search for a coin"
          className="w-full md:w-[40%]"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer relative"
              onClick={() => requestSort("market_cap_rank")}
            >
              #{" "}
              {sortConfig.key === "market_cap_rank" && (
                <span className="absolute ml-3">
                  {sortConfig.direction === "ascending" ? "↑" : "↓"}
                </span>
              )}
            </TableHead>
            <TableHead onClick={() => requestSort("name")}>
              Coin{" "}
              {sortConfig.key === "name" && (
                <span className="absolute ml-3">
                  {sortConfig.direction === "ascending" ? "↑" : "↓"}
                </span>
              )}
            </TableHead>
            <TableHead onClick={() => requestSort("current_price")}>
              Price{" "}
              {sortConfig.key === "current_price" && (
                <span className="absolute ml-3">
                  {sortConfig.direction === "ascending" ? "↑" : "↓"}
                </span>
              )}
            </TableHead>
            <TableHead
              onClick={() =>
                requestSort("price_change_percentage_1h_in_currency")
              }
            >
              1h{" "}
              {sortConfig.key === "price_change_percentage_1h_in_currency" && (
                <span className="absolute ml-3">
                  {sortConfig.direction === "ascending" ? "↑" : "↓"}
                </span>
              )}
            </TableHead>
            <TableHead
              onClick={() =>
                requestSort("price_change_percentage_24h_in_currency")
              }
            >
              24h{" "}
              {sortConfig.key === "price_change_percentage_24h_in_currency" && (
                <span className="absolute ml-3">
                  {sortConfig.direction === "ascending" ? "↑" : "↓"}
                </span>
              )}
            </TableHead>
            <TableHead
              onClick={() =>
                requestSort("price_change_percentage_7d_in_currency")
              }
            >
              7d{" "}
              {sortConfig.key === "price_change_percentage_7d_in_currency" && (
                <span className="absolute ml-3">
                  {sortConfig.direction === "ascending" ? "↑" : "↓"}
                </span>
              )}
            </TableHead>
            <TableHead onClick={() => requestSort("total_volume")}>
              24h Volume{" "}
              {sortConfig.key === "total_volume" && (
                <span className="absolute ml-3">
                  {sortConfig.direction === "ascending" ? "↑" : "↓"}
                </span>
              )}
            </TableHead>
            <TableHead onClick={() => requestSort("market_cap")}>
              Mkt Cap{" "}
              {sortConfig.key === "market_cap" && (
                <span className="absolute ml-3">
                  {sortConfig.direction === "ascending" ? "↑" : "↓"}
                </span>
              )}
            </TableHead>
            <TableHead>Last 7 Days</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coins.map((coin) => {
            const formatted_price = (item: number) => {
              const price = item.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              });
              return price;
            };

            const icon =
              coin?.price_change_percentage_1h_in_currency > 0 ? (
                <ArrowUp className="w-3 h-3 mr-2" />
              ) : (
                <ArrowDown className="w-3 h-3 mr-2" />
              );

            return (
              <TableRow key={coin.id}>
                <TableCell>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    {coin.market_cap_rank}
                  </div>
                </TableCell>
                <TableCell>
                  <Link href={`coin/${coin.id}`}>
                    <div className="flex items-center">
                      <Image
                        src={coin.image}
                        className="w-5 h-5 mr-2"
                        alt="coin image"
                        width={20}
                        height={20}
                      />
                      <span className="font-bold mr-2">{coin.name}</span>
                      <span className="text-muted-foreground">
                        {coin.symbol}
                      </span>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>{formatted_price(coin.current_price)}</TableCell>
                <TableCell>
                  <div
                    className={`flex items-center ${
                      coin.price_change_percentage_1h_in_currency > 0
                        ? "text-green-500"
                        : "text-red-600"
                    }`}
                  >
                    {icon}
                    {coin.price_change_percentage_1h_in_currency.toFixed(2)}%
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className={`flex items-center ${
                      coin.price_change_percentage_24h_in_currency > 0
                        ? "text-green-500"
                        : "text-red-600"
                    }`}
                  >
                    {icon}
                    {coin.price_change_percentage_24h_in_currency.toFixed(2)}%
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className={`flex items-center ${
                      coin.price_change_percentage_7d_in_currency > 0
                        ? "text-green-500"
                        : "text-red-600"
                    }`}
                  >
                    {icon}
                    {coin.price_change_percentage_7d_in_currency.toFixed(2)}%
                  </div>
                </TableCell>
                <TableCell>{formatted_price(coin.total_volume)}</TableCell>
                <TableCell>{formatted_price(coin.market_cap)}</TableCell>
                <TableCell>
                  <LineChart sparklineData={coin.sparkline_in_7d.price} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center sm:justify-between flex-wrap my-10">
        <div className="mb-5">
          Showing {(currentPage - 1) * coinsPerPage + 1} -{" "}
          {Math.min(currentPage * coinsPerPage, coins.length)} of{" "}
          {fetchedCoins.length} results
        </div>
        <div className="mb-5 space-x-5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleFirstPage}
            disabled={currentPage === 1}
          >
            First
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLastPage}
            disabled={currentPage === totalPages}
          >
            Last
          </Button>
        </div>
        <div className="mb-5">
          Show
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="mx-2">
                {coinsPerPage} <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                {[10, 50, 100].map((value) => (
                  <DropdownMenuCheckboxItem
                    key={value}
                    onClick={() => setCoinsPerPage(value)}
                  >
                    {value}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          Coins
        </div>
      </div>
    </>
  );
};

export default Catalog;
