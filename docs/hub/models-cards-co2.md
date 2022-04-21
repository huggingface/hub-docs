---
title: Carbon Emissions
---

<h1>Displaying carbon emissions for your model</h1>

## Why is it useful to calculate the carbon emissions of my model?

Training ML models is often energy intensive and can produce a substantial carbon footprint, as described by [Strubell et al.](https://arxiv.org/abs/1906.02243). It's therefore important to *track* and *report* the emissions of models to get a better idea of the environmental impacts of our field.


## What information should I include about the carbon footprint of my model?

If you can, include information about:
- where the model was trained (in terms of location)
- the hardware that was used -- e.g. GPU, TPU or CPU, and how many
- training type: pre-training or fine-tuning
- the estimated carbon footprint of the model, calculated in real-time with the [Code Carbon](https://github.com/mlco2/codecarbon) package or after the fact using the [ML CO2 Calculator](https://mlco2.github.io/impact/).

## Carbon footprint metadata

The data can be added to the model card metadata (README.md file). The structure of the metadata should be:

```yaml
---
co2_eq_emissions:
	  emissions: "in grams of CO2"
	  source: "source of the information, either directly from AutoTrain, code carbon or from a scientific article documenting the model"
	  training_type: "pretraining or fine-tuning"
	  geographical_location: "as granular as possible, for instance Quebec, Canada or Brooklyn, NY, USA"
	  hardware_used: "how much compute and what kind, e.g. 8 v100 GPUs"
---
```

## How is the carbon footprint of my model calculated? 🌎

By taking into account the computing hardware, location, usage and training time, it's possible to provide an estimate of how much CO<sub>2</sub> was produced by the model.

The math is actually pretty simple! ➕

First, you take the *carbon intensity* of the electric grid that is being used for the training -- this is how much CO<sub>2</sub> is produced by KwH of electricity used. This depends on the location where the hardware is located and the [energy mix](https://electricitymap.org/) used at that location -- whether it's renewable energy like solar 🌞, wind 🌬️ and hydro 💧, or non-renewable energy like coal ⚫ and natural gas 💨. The more renewable energy is used, the less carbon intensive it is!
 
Then, you take the power consumption of the GPU during training -- this is done using the `pynvml` library.

Finally, you multiply the power consumption and carbon intensity by the training time of the model, and you have an estimate of how much CO<sub>2</sub> was emitted.

Keep in mind that this isn't an exact number, because there are other factors that come into play -- like the energy that's used for data center heating and cooling -- which will increase carbon emissions. But this will already give you a good idea of the scale of CO<sub>2</sub> emissions that your model is producing!

To add **Carbon Emissions** metadata to your models:

1. If you are using **AutoTrain**, this is tracked for you 🔥
2. Otherwise, use a tracker like  Code Carbon in your training code, then specify `co2_eq_emissions.emissions: 1.2345` in your model card metadata, where `1.2345` is the emissions value in **grams**. 

To learn more about the carbon footprint of Transformers, check out the [video](https://www.youtube.com/watch?v=ftWlj4FBHTg), part of the Hugging Face Course!
