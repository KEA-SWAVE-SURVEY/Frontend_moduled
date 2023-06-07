import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, Legend } from "recharts";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import randomColor from 'randomcolor';

const renderActiveShape = (props) => { 
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`결과값:  ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(비율 ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
 
export const PieChartComponent = ({ data}) => {
     
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
      (_, index) => {
        setActiveIndex(index);
      },
      [setActiveIndex]
    );
    return(
  <PieChart width={600} height={350} fontSize={20}>
    <Pie
      activeIndex={activeIndex}
      activeShape={renderActiveShape}
      data={data}
      cx={"50%"}
      cy={"50%"}
      innerRadius={60}
      outerRadius={120}
      fill="#8884d8"
      dataKey="value"
      onMouseEnter={onPieEnter}
    />
    <Legend />
  </PieChart>
  )
  
};

export const BarChartComponent = ({ data }) => { 
  
    const updatedData = data.map((d) => { 
        return {
          ...d, 
          fill: randomColor({luminosity: 'liight', hue: 'random' })
           
        };
         
      });
       
      data =updatedData;
       

return( 
  <div  style={{whiteSpace : 'pre-line'}}>
<BarChart width={800} height={300} data={data} fontSize={15}>
    <YAxis type="number" />
    <XAxis dataKey="choiceTitle"  />
    <Tooltip content={({ active, payload }) => { 
      if (active) {
          return ( 
              <div style={{ backgroundColor: 'white', padding: '5px', fontSize: '15px' }}>
              <p>{`${payload[0].payload.choiceTitle}`}</p>
                  <p>{`비율: ${payload[0].value}`}</p>
              </div>
          );
      }
}} />
    
    <Bar dataKey="support" fill="#8884d8"  
      />
  </BarChart>
  </div>
 


)  
     
};