import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface CovidData {
  country: string;
  cases: number;
}

interface BarChartProps {
  covidData: CovidData[];
}

const BarChart: React.FC<BarChartProps> = ({ covidData }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!svgRef.current || !tooltipRef.current) return;

    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    svg.selectAll("*").remove();

    const width = 500;
    const height = 400;
    const margin = { top: 40, right: 30, bottom: 100, left: 60 };

    const xScale = d3
      .scaleBand()
      .domain(covidData.map((d) => d.country))
      .range([margin.left, width - margin.right])
      .padding(0.4);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(covidData, (d) => d.cases) || 100000])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const g = svg.append("g").attr("class", "chart-content");

    const xAxis = g.append("g");
    xAxis
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(45)")
      .style("text-anchor", "start")
      .attr("fill", "white");

    const yAxis = g.append("g");
    yAxis
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    const bars = g.selectAll("rect");
    bars
      .data(covidData)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.country) ?? 0)
      .attr("y", (d) => yScale(d.cases) ?? 0)
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - margin.bottom - (yScale(d.cases) ?? 0))
      .attr("fill", "#16C79A")
      .attr("stroke", "#19456B")
      .attr("stroke-width", 2)
      .on("mouseover", function (event: MouseEvent, d: CovidData) {
        tooltip
          .style("opacity", 1)
          .html(
            `<strong>${d.country}</strong>: ${d.cases.toLocaleString()} cases`
          )
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mousemove", function (event: MouseEvent) {
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mouseout", function () {
        tooltip.style("opacity", 0);
      });

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 3]) // Min and max zoom levels
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);
  }, [covidData]);

  return (
    <div className="flex flex-col items-center text-white bg-gray-900 p-6 rounded-lg shadow-lg relative">
      <h2 className="text-xl text-white">COVID-19 Cases by Country</h2>
      <h3 className="mb-4">Scroll to zoom</h3>
      <svg
        ref={svgRef}
        width={500}
        height={400}
        className="bg-gray-800 rounded-lg"
      ></svg>
      <div
        ref={tooltipRef}
        className="absolute bg-white text-black text-xs px-2 py-1 rounded shadow-lg opacity-0 transition-opacity duration-200"
      ></div>
    </div>
  );
};

export default BarChart;
