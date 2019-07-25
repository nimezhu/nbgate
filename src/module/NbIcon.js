import React from "react"
import ReactDOM from "react-dom"
import * as  d3 from "d3"
class NbIcon extends React.Component {
    state = {
        scale:0.2
    }
    componentDidMount() {
        this._render()
    }
    _render() {
        var el = d3.select(ReactDOM.findDOMNode(this));
        el.attr("align", "center")
        el.style("padding", "10px")
        var icon = `
<svg id="svg" height="100" width="100" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
     <radialGradient id="grad1" cx="70%" cy="50%" r="60%" fx="50%" fy="50%">
      <stop offset="0%" style="stop-color:rgb(255,255,255);
      stop-opacity:0" />
      <stop offset="100%" style="stop-color:#000;stop-opacity:0.8" />
    </radialGradient>
    <g id="charN">
    <path d="M 43.848 1.953 L 66.895 1.172 L 63.379 67.383 L 37.793 69.727 L 24.121 34.277 L 21.973 70.41 L 0 70.41 L 1.758 1.172 L 26.172 0 L 43.066 35.156 L 43.848 1.953 Z" vector-effect="non-scaling-stroke"/></g>
    </g>
    <g id="charB">
    <path d="M 0.098 67.676 L 0 4.785 A 57.841 57.841 0 0 1 4.669 3.105 A 65.393 65.393 0 0 1 5.811 2.759 A 66.496 66.496 0 0 1 12.085 1.245 Q 15.283 0.635 18.457 0.317 A 62.649 62.649 0 0 1 23.862 0.005 A 56.598 56.598 0 0 1 24.609 0 A 56.835 56.835 0 0 1 31.616 0.439 A 38.643 38.643 0 0 1 38.428 1.904 Q 41.699 2.93 44.531 4.565 A 19.855 19.855 0 0 1 49.487 8.594 A 17.623 17.623 0 0 1 52.713 13.913 A 19.98 19.98 0 0 1 52.808 14.16 A 18.046 18.046 0 0 1 53.758 17.924 A 24.625 24.625 0 0 1 54.004 21.484 A 16.976 16.976 0 0 1 53.583 25.316 A 15.175 15.175 0 0 1 53.223 26.611 Q 52.441 29.004 50.977 30.908 A 13.9 13.9 0 0 1 47.412 34.155 A 15.06 15.06 0 0 1 43.566 35.894 A 17.486 17.486 0 0 1 42.676 36.133 A 21.453 21.453 0 0 1 47.632 38.09 A 19.754 19.754 0 0 1 48.462 38.574 Q 51.074 40.186 52.905 42.48 Q 54.736 44.775 55.737 47.656 A 18.397 18.397 0 0 1 56.728 53.148 A 21.006 21.006 0 0 1 56.738 53.809 A 18.509 18.509 0 0 1 56.453 57.14 A 13.288 13.288 0 0 1 55.249 60.791 Q 53.76 63.721 51.27 65.771 A 21.005 21.005 0 0 1 46.528 68.693 A 24.175 24.175 0 0 1 45.532 69.116 Q 42.285 70.41 38.77 71.143 Q 35.254 71.875 31.714 72.119 A 107.341 107.341 0 0 1 28.29 72.302 A 86.647 86.647 0 0 1 25.098 72.363 Q 22.07 72.363 18.823 72.144 A 66.739 66.739 0 0 1 12.354 71.387 A 55.979 55.979 0 0 1 6.006 69.946 A 36.117 36.117 0 0 1 0.098 67.676 Z M 22.266 42.188 L 22.07 53.32 A 54.975 54.975 0 0 0 23.511 53.589 A 8.181 8.181 0 0 0 24.902 53.711 A 11.147 11.147 0 0 0 26.047 53.649 A 14.841 14.841 0 0 0 27.148 53.491 A 6.583 6.583 0 0 0 29.443 52.612 A 5.479 5.479 0 0 0 31.215 50.848 A 6.299 6.299 0 0 0 31.226 50.83 A 4.202 4.202 0 0 0 31.722 49.662 Q 31.934 48.866 31.934 47.852 Q 31.934 46.405 31.503 45.373 A 4.158 4.158 0 0 0 31.226 44.824 Q 30.518 43.652 29.492 42.993 A 6.115 6.115 0 0 0 27.246 42.114 A 14.709 14.709 0 0 0 26.074 41.949 A 11.047 11.047 0 0 0 25 41.895 Q 23.584 41.895 22.266 42.188 Z M 22.559 21.68 L 22.266 32.52 A 16.622 16.622 0 0 0 23.163 32.493 Q 23.581 32.471 24.052 32.428 A 36.195 36.195 0 0 0 25.049 32.324 A 11.484 11.484 0 0 0 28.247 31.47 A 6.865 6.865 0 0 0 30.859 29.517 A 4.383 4.383 0 0 0 31.696 27.88 Q 31.874 27.245 31.919 26.492 A 8.719 8.719 0 0 0 31.934 25.977 A 5.717 5.717 0 0 0 31.825 24.836 A 4.141 4.141 0 0 0 31.348 23.56 A 5.646 5.646 0 0 0 30.427 22.368 A 5.037 5.037 0 0 0 29.907 21.924 A 5.843 5.843 0 0 0 28.052 20.996 Q 27.051 20.703 26.27 20.703 A 6.287 6.287 0 0 0 24.365 20.996 A 17.19 17.19 0 0 0 22.559 21.68 Z" vector-effect="non-scaling-stroke"/>
    </g>  
</defs>
  <g id="icon" transform="scale(0.2)">
    <circle cx=250 cy=250 r=250 fill="#F0F0F0" opacity=1.0></circle>
    <g transform="translate(175,175)">
    <use xlink:href="#charN" fill="#226A98" transform="scale(2)"/> 
    </g> 
     <g transform="translate(325,175)">
    <use xlink:href="#charB" fill="#CE5156" transform="scale(2)"/> 
    </g>   
</g>
                  </svg>

        `
        el.html(icon)

        function getBand(genome, callback) {
            var chrBands = {}
            fetch("/entry/data/" + genome + ".cytoBand.txt", {
                "credentials": "include"
            }).then(function(res) {
                res.text().then(function(d) {
                    var l = d.split("\n")
                    l.forEach(function(d) {
                        var a = d.split("\t")
                        var c = a[0]
                        var s = parseInt(a[1])
                        var e = parseInt(a[2])
                        var band = a[3]
                        if (!(c in chrBands)) {
                            chrBands[c] = {
                                "band": []
                            };
                        }
                        chrBands[c]["band"].push({
                            "chr": c,
                            "start": s,
                            "end": e,
                            "id": band,
                            "value": a[
                                4
                            ]
                        })
                    })
                    callback(chrBands)
                })
            }).catch(function(e) {
                console.log(e)
                callback(null)
            })
        }

        var width = 500
        var height = 500
        var cs = d3.interpolateBlues;
        var colorMap = {
            "blue": d3.interpolateBlues,
            "grey": d3.interpolateGreys,
            "green": d3.interpolateGreens,
        }

        var cband = {
            "gneg": 0.10,
            "gpos33": 0.33,
            "gpos66": 0.66,
            "gpos75": 0.75,
            "gpos50": 0.5,
            "gpos25": 0.25,
            "gpos100": 1.0,
            "gvar": 0.5,
            "acen": "grey",
            "stalk": 0.25,
        }
        var colorBand = function(v) {
            if (v === "acen") return "grey"
            if (v in cband) return cs(cband[v])
            return "red"
        }
        var pie = d3.pie().sort(null).startAngle(
            0.20 *
            Math.PI).endAngle(-
            1.28 * Math.PI)
        var canvas = el.select("#svg")
        var l = 500 * this.state.scale
        canvas.attr("height",l)
        canvas.attr("width",l)
        var svg = el.select("#icon").attr("transform","scale("+this.state.scale+")")
        var chrs
        getBand("hg38", function(d) {
            chrs = d
            if (d!==null){
                renderChr("chr1")
            }
        })
        var renderChr = function(chr) {
            var d = chrs[chr]
            var arc = d3.arc()
                .innerRadius(170)
                .outerRadius(210)
                .cornerRadius(1)
            svg.selectAll(".chr").remove()
            var g = svg.append("g").attr(
                    "opacity",
                    0.9)
                .classed("chr", true)
                .attr("transform", "translate(" +
                    width / 2 +
                    "," + height / 2 + ")")

            var data = d.band.map(function(d) {
                return d.end - d.start
            })
            var arcs = pie(data);
            // background 
                g.selectAll(".path1")
                .data(arcs)
                .enter()
                .append("path")
                .classed("path1", true)
                .style("fill", function(d0, i) {
                    return colorBand(d.band[i].value)
                })
                .attr("d", function(d0, i) {
                    return arc(d0)
                })
        }
        var renderArrow = function() {
            var g2 = svg.append("g")
                .attr("transform", "translate(" +
                    width / 2 +
                    "," + height / 2 + ")")
            var data2 = [100]
            var arc2 = d3.arc()
                .innerRadius(210)
                .outerRadius(250)
                .cornerRadius(1)

            var arcs2 = pie(data2)
            g2.selectAll(".path2")
                .data(arcs2)
                .enter()
                .append("path")
                .classed("path2", true)
                .style("fill", function(d0, i) {
                    return "#CE5146"
                })
                .attr("d", arc2)
            svg.append("g")
                .attr("transform",
                    "translate(469,63) rotate(80)")
                .append("path")
                .attr("d",
                    "M 0 97 L 48 48 L  -48 48 Z")
                .style("fill", "#CE5146")

        }
        renderArrow()
        var array = []
        for (var i = 0; i < 22; i++) {
            array.push("chr" + (i + 1))
        }
        array.push("chrX")
        array.push("chrY")
        var color = ["blue", "grey", "green"]
        setInterval(function(d) {
            var k = Math.floor(Math.random() * 3)
            cs = colorMap[color[k]]
            var i = Math.floor(Math.random() * array.length)
            renderChr(array[i])
        }, 3000)

    }
    componentDidUpdate() {
    }
    render() {
        const {scale} = this.props 
        this.state.scale = scale || 0.2
        //var el = React.createElement("div", null)
        //this._render(el)
        return (<div></div>);
    }
}


export default NbIcon
