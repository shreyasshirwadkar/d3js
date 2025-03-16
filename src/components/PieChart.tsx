import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface CovidData {
  country: string;
  cases: number;
}

interface PieChartProps {
  covidData: CovidData[];
}

const PieChart: React.FC<PieChartProps> = ({ covidData }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const radius = 150;
  const totalWidth = radius * 2;

  useEffect(() => {
    if (!svgRef.current || covidData.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const tooltip = d3.select(tooltipRef.current);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    const pie = d3.pie<CovidData>().value((d) => d.cases);
    const dataReady = pie(covidData);

    const arcGenerator = d3
      .arc<d3.PieArcDatum<CovidData>>()
      .innerRadius(0)
      .outerRadius(radius);

    svg
      .selectAll("path")
      .data(dataReady)
      .enter()
      .append("path")
      .attr("d", arcGenerator)
      .attr("fill", (_, i) => colorScale(i.toString()))
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("opacity", 0.7)
      .attr("transform", `translate(${radius},${radius})`)
      .on("mouseover", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(`<strong>${d.data.country}</strong>: ${d.data.cases} cases`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

    svg
      .selectAll("text")
      .data(dataReady)
      .enter()
      .append("text")
      .text((d) => d.data.country)
      .attr("text-anchor", "middle")
      .attr("font-size", 14)
      .attr("transform", (d) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${x + radius},${y + radius})`;
      });
  }, [covidData]);

  return (
    <div className="flex flex-col items-center text-white bg-gray-900 p-6 rounded-lg shadow-lg ">
      <h2 className="text-xl text-white text-center  mb-4">
        COVID-19 Cases (Pie Chart)
      </h2>
      <svg ref={svgRef} width={totalWidth} height={totalWidth} />
      <div
        ref={tooltipRef}
        className="absolute bg-white text-black text-xs px-2 py-1 rounded opacity-0 pointer-events-none transition-opacity"
      />
    </div>
  );
};

export default PieChart;
