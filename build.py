from collections import defaultdict
import numpy as np
import os


layer_sizes = {
    "conv2d0" : 64,
    "conv2d1" : 64,
    "conv2d2" : 192,
    "mixed3a" : 256,
    "mixed3b" : 480,
    "mixed4a" : 508,
    "mixed4b" : 512,
    "mixed4c" : 512,
    "mixed4d" : 528,
}

figure_html = {}

for f in os.listdir("public/images/"):
  if ".svg" not in f: continue
  name = f.split(".")[0]
  key = "images/" + name
  print(key)
  lines = open("public/images/" + f).read().split("\n")
  if "<svg" in lines[0]:
    lines[0] = lines[0].replace(">", "id=\"diagram-%s\">"%name)
    lines[0] = lines[0].replace(">", "style='width: 100%; height: auto;'>")
  lines[2] = lines[2].replace("clip-path", "--disabled-clip-path")
  text = []
  for line in lines:
    line = line.replace("\"pattern", "\"pattern"+name)
    line = line.replace("#pattern", "#pattern"+name)
    line = line.replace("\"image", "\"image"+name)
    line = line.replace("#image", "#image"+name)
    if ("<rect" in line or "<path" in line) and "id=" in line:
      neuron_id = line.split("id=\"")[1].split("\"")[0]
      # print("maybe link", neuron_id)
      if "_" in neuron_id and neuron_id.split("_")[0] in layer_sizes:
        if neuron_id.count("_") > 1:
          neuron_id = neuron_id[:-2]
        url = "https://storage.googleapis.com/inceptionv1-weight-explorer/%s.html" % neuron_id
        #pattern_n = line.split("#pattern")[1].split(")")[0]
        # print("link found!", neuron_id)
        text.append("<a href='%s'>" % url)
        text.append(line)
        text.append("</a>")
      else:
        text.append(line)
    else:
      text.append(line)
  figure_html[key] = "\n".join(text)

index_template = open("index_template.html", "r").read()
index_html = index_template.format(**figure_html)
open("public/index.html", "w").write(index_html)
