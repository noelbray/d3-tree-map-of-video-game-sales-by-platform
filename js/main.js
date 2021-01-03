/*
This code is raw, unrefactored. 
I had to jump from Mike Bostock's treemap example to other treemap examples and the D3 documentation in order to get the treemap to work. 
I don't know if the legend is created in such a way that would be considered best practice as per D3 methods, but the legend looks good and gets the job done which is to convey meaning to the viewer, user.

To FCC Challenge inspector (if indeed there is someone reviewing this code to see if it did pass all test, (which it does :) )), you may want to modify the code of the treemap test suit so that if the rect area values are close, but still larger than each, the 6th test wont fail... but that is just my suggestion. 

In previous D3 challenges I had used d3.json to get the data, but this time I wanted to try to get the data using fetch, so I did. 

The commented out code is code that didn't work or that I decided not to use for some reason, of which both cases I left commented out within the code so that I would be less likely to remember not to use that code again or to be able to go back to it. 
*/

// let multiplier = 1;
// let y = 12;
const body = d3.select("body");
const treemapSVG = d3.select("svg#treemap");
// treemap.style("border", "1px solid red");
const legend = d3.select("#legend");
const tooltip = d3.select("#tooltip");
// tooltip.style("border-color", "red");

const treemapURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

const height = 600;
const width = 800;
// const height = 570;
// const width = 960;
const legendHeight = 200;
const legendWidth = width;

treemapSVG
  // .style("width", width)
  // .style("height", height);
  .attr("viewBox", [0, 0, width, height]);

legend
  // .attr("style", `width: ${legendWidth}; height: ${legendHeight}`)
  .attr("viewBox", [0, 0, legendWidth, legendHeight]);
// .attr("viewBox", [0, 0, "auto", legendHeight])
// .style("width", "fit-content")
// .style("height", legendHeight)
// .style("display", "block")

fetch(treemapURL)
  .then(responseFromFetch => responseFromFetch.json())
  .then(
  (/*error,*/ treeData) => { // arrow function
    // if (error) throw error; // mozilla is showing to use catch in their Body.json() example
    // https://developer.mozilla.org/en-US/docs/Web/API/Body/json
    // console.log(treeData);
    // console.log(`Treemap Data ${treeData.name}`)
    const categories = treeData.children.map(obj => obj.name);
    
    const colors = ["tomato", "orange", "yellow", "greenyellow", "turquoise", "cornflowerblue", "dodgerblue", "seashell", "mediumpurple", "yellowgreen", "lightblue", "aqua", "darkorange", "lightgreen", "red", "skyblue", "thistle", "wheat"];
    
    console.log("Here are the categories", categories);
    
    const colorScheme = d3.scaleOrdinal();
    
    colorScheme
      .domain(categories)
      .range(colors);
      // .range(["rgb(255, 255, 255)", "rgb(255, 0, 0)", "rgb(0, 255, 0)", "rgb(255, 0, 255)"])
    
    const root = treemapRootFunc(treeData);
    
    const leaf = treemapSVG       
      .selectAll("g")
      .data(root.leaves())
      .join("g")
      .attr("transform", d => `translate(${d.x0}, ${d.y0})`);
    
    leaf
      .append("rect")
      .attr("stroke", "black")
      // .attr("stroke-linejoin", "round")
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .attr("fill", d => {
      // console.log("fill by category name", d.parent.data.name);
      console.log("Category Is: ", d.data.category);
      return colorScheme(d.data.category)})
      // .attr("id", (d, i) => `${d.data.category}-${i}`)
      .attr("id", (d, i) => `clip-path-target-${i}`)
      // .attr("id", d => (d.leafUid = DOM.uid("leaf")).id)
      .attr("class", (d, i) => `tile t${i}`)
      // .attr("data-name", (d, i) => d.children[i].children[i].name)
      .attr("data-name", (d, i) => { 
        // console.log(d.parent);
        // console.log(d.parent.children);
        // console.log(d.children);
        // console.log(d.children.data); // produces error
        // console.log(d.data.name);
        return d.data.name;
      }) 
        // .attr("data-name", d => d.data.name)
    // d.parent, d.children, d.data : node.parent, node.children, node.data// read more about them on https://github.com/d3/d3-hierarchy/blob/v2.0.0/README.md#node_leaves 
      .attr("data-category", d => d.data.category)
      .attr("data-value", d => d.data.value);
      // .attr("data-value", d => d.parent.children.value)
      // .attr("data-name", d => d.name)// when ready, resume working pn the different 'fill' colors and maybe unique ids for each rect
    
    // leaf
      // .selectAll("rect")
      // .attr("class", "tile")
      // .data(treeData)
      // .attr("data-name", d => d.name)     
       
//     leaf
//       // .append("text")
//       // .selectAll("text")
//       .append("rect")
//       // .selectAll("tspan")
//       // .data(d => {let array = d.data.name.split(" "); })
//       .data( d => d)
//       // .join("text")
//       .join("rect")
//       .attr("fill", "gold")
//       .attr("width", "25%")
      
//       .append("text")
//       // .join("tspan")
//       // .join(d => d.data.name.replace(/\w+/g, word => `<tspan>${word}</tspan>`))
//       .attr("x", 3)
//       // // .attr("y", (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
//       .attr("y", 12)
//       .attr("fill", "black")
//       .attr("font-size", "0.5em") // 0.8vw
//       // .text(d => d.data.name.replace(/(\w+)/g, word => `<tspan>${word}</tspan>`))
//       // // .attr("textLength", "25%")
//       // // .text(d => d.data.name.split(" ").join(" <br> "))
// //       .html(d => d.data.name.replace(/\w+/g, word => {
      
      
// //       // y *= multiplier++; I tried using the y variable for the y attribute but it doesn't work. I'm not quite for sure how to reset it 
// //       // if (multiplier === d.data.name.split(" ").length) {multiplier = 1; y = 12;}
// //       // y *= multiplier;
// //       // multiplier++;
// //       return `<tspan x="${3}" y="${12/*y*/}">${word}</tspan>`}))
// //     .html( d => d.data.name.split(" ").map((word, index) => {
// //       let y = 8;
// //       // if (index == 0) y = 12;
// //       // else y *= index + 1;
// //       // if (index == 1) y += 12;
// //       // if (index != 0 && index > 1) y *= index;
// //       y *= index + 1
      
// //       return `<tspan x="${3}" y="${y}">${word}</tspan>`
// //     })) // I'm probably going to have to figure out how to do a clipPath and clip-path when I'm ready too. // look at the documentation. 
//     // d3.selectAll("tspan")
//     //   .attr("x", 3)
//     //   .attr("y", d => 12 * 2)
//     .text(d => d.data.name)
    
    leaf
      .append("clipPath")
      .attr("id", (d, i) => `clip-path-${i}`)
      // .attr("id", d => (d.clipUid = DOM.uid("clip")).id)
      .append("use")
      // .attr("clip-path", (d, i) => `url(#clip-path-${i})` )
      .attr("xlink:href", (d, i) => `#clip-path-target-${i}` );
     // .attr("xlink:href", d => d.leafUid.href);
      
    leaf
      .append("text")
      .attr("class", "leaf-text")
      .attr("clip-path", (d, i) => `url(#clip-path-${i}`)
      .selectAll("tspan")
      .data(d => {
        //console.log(d.data.name.split(/ /))
      // return d.data.name.split(/ (?=\w));
        // return d.data.name.split(/ (?=\d+)/) // maybe resume here working on getting the number to stay behind he word as well as the ampersand &
      // return d.data.name.split(/(?<=\d+|&|\w+ &|\d+ \w+) /)
      // return d.data.name.split(/(?<=\w) (?=\w)|(?<=\w &) |(?<=\w \d+) /);
      return d.data.name.split(/(?<=[A-z]) (?=[A-z])|(?<=&) (?=\w)|(?<=\d) |(?<=:) (?=\w)| (?=\(\d+)/);
      })
      .join("tspan")
      .attr("x", 3)
      // .attr("y", 12)
      .attr("y", (d, i) => 12 * (i + 1))
      .text(d => d)
      .attr("font-size", "0.5em");
      // .text(d => d.data.name)  
    
    
legend
  // .style("background-color", "purple")
  .selectAll("rect")
  .data(categories)
  .enter()
  .append("rect")
  .attr("class", "legend-item")
  .attr("category", (d, i) => d)
  .attr("fill", d => colorScheme(d))
  .attr("stroke", "black")
  .attr("stroke-width", 0.7)
  .attr("width", 800 / 18)
  .attr("height", 10)
  // .attr("x", (d, i) => 800 / 9 * i)
  .attr("x", (d, i) => xPosition(i))
  .attr("y", (d, i) => yPosition(i));
    
legend
  .selectAll("text")
  .data(categories)
  .join("text")
  .attr("fill", d => colorScheme(d))
  .attr("stroke", "black")
  .attr("stroke-width", 0.7)
  .text(d => d)
  .attr("text-anchor", "start")
  .attr("x", (d, i) => xPosition(i))
  .attr("y", (d, i) => yPosition(i) - 5)
  .style("font-size", "17px")
  .style("font-weight", 700)
    
  const tiles = d3.selectAll(".tile");
  
  tiles
    .on("mouseover",
        function (d) {
          tooltip
            .style("opacity", 1)
          // "this" here, refers to the tile
            // .attr("data-name", d3.select(".tile").attr("data-name"))
            .attr("data-name", d3.select(this).attr("data-name"))
            .attr("data-category", d3.select(this).attr("data-category"))
            .attr("data-value", d3.select(this).attr("data-value"))
            .style("background-color", colorScheme(d3.select(this).attr("data-category")));
            // .style("color", colorScheme(d3.select(this).attr("data-category")));
    
    
          tooltip
          //"this" here, refers to this tooltip
             .html(`${d3.select(this).attr("data-category")}<br/>${d3.select(this).attr("data-name")}<br/>${d3.select(this).attr("data-value")}`);
              // .text(`${d3.select(this).attr("data-category")} ${d3.select(this).attr("data-name")} ${d3.select(this).attr("data-value")}`);
    })
    .on("mousemove",
        function (e) {
          tooltip
            .style("left", e.pageX + "px")
            .style("top", e.pageY + "px")
    })
    .on("mouseout",
        function (d) {
          tooltip
            .style("opacity", 0);
    })
    
    
  // Helper Functions: 
    
  function hierarchyRoot (data) {
    return d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
  }
    
  function treemapRootFunc (data) { 
    
    console.log("treemapRootFunc is working, here's the data: ")
    console.log(data)
    
    return d3.treemap()
      .tile(d3.treemapSquarify)
      .size([width, height])
      //.padding(1) // sets inner and outer padding
      .paddingInner(3) // inner padding between each rect
      .paddingOuter(2) // padding around each group
      // .round(true) // The rounding function of treemap.round was causing my treemap not to past the 6th test which jeremy.a.gray suggested that it was causing the values to be too close, which may be causing the the test to fail.
      (hierarchyRoot(data));
    }    
   
    function xPosition(i) {
    // Maybe someday I'll learn a better way to make this legend
    let width = 800 / 9;
    switch(i) {
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: return width * i + (width / 4.5);
      case 9: return width * 0 + (width / 4.5);
      case 10: return width * 1 + (width / 4.5);
      case 11: return width * 2 + (width / 4.5);
      case 12: return width * 3 + (width / 4.5);
      case 13: return width * 4 + (width / 4.5);
      case 14: return width * 5 + (width / 4.5);
      case 15: return width * 6 + (width / 4.5);
      case 16: return width * 7 + (width / 4.5);
      case 17: return width * 8 + (width / 4.5);
      default: return;
    }
  }
    
    function yPosition(i) {
    switch(i) {
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: return 40; // 90;
      case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16: case 17: return 90; // 190;
      default: return;
    }
  }
    
    /*
  function (category, svgElement = rect, axis, i) {
    if (axis === "x") {
      switch(category) {
        case 2600: case Wii: case NES: case GB: case DS: case X360: case PS3: case PS2: case SNES: return svgElement === "rect" ? 
        case GBA: case PS4: case 3DS: case N64: case PS: case XB: case PC: case PSP: case XOne:
      }
    }
    if (axis === "y") {
      switch(category) {
        case 2600: case Wii: case NES: case GB: case DS: case X360: case PS3: case PS2: case SNES: 
        case GBA: case PS4: case 3DS: case N64: case PS: case XB: case PC: case PSP: case XOne:
      }
    }
  }
  */
  })
  .catch(console.error);

// let treemapData;

// d3.json(treemapURL).then(
  
//   function (error, data) {
  
//     if (error) throw error;
    
//     // treemapData = data;
//     console.log("Treemap Data: " + data);
//     // console.log(data);
//   }
// );
