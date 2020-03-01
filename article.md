Many important transition points in the history of science have been moments when science “zoomed in.” At these points, we develop some visualization or tool that allows us to see the world in a new level of detail, and a new field of science develops to study the world through this lens.

For example, the invention of the microscope led to the discovery of cells, and eventually cellular biology. Science zoomed in. The invention of a number of techniques including x-ray crystallography enabled the discovery of DNA and the “molecular revolution” in biology. Science zoomed in. Atomic theory, subatomic particles, and neuroscience are other examples of science zooming in.

These transitions weren’t just a change in precision: they were qualitative changes in what the objects of scientific inquiry are. For example, cellular biology isn’t just more careful zoology.

figure: micrographia

Just as the microscope revealed a tantalizing microscopic world, visualizations of artificial neural networks have revealed tantalizing hints and glimpses of a rich inner world within our models. This has led us to wonder: Is it possible that deep learning is at a similar transition point? Could there be a kind of cellular biology or neuroscience analogue of deep learning? And if so, what might such a field look like? What are its objects of study, and what would rigorous inquiry into them look like?

Our tentative answer is that you get the study of features and the neural circuits that implement them.

Exploring these objects over the last year and a half has led to the circuits project, an open scientific collaboration hosted on the Distill slack. In future articles, the collaboration will publish detailed explorations of this inner world. But before we do that, we wanted to offer a high-level overview of our thinking and some of the working principles that we’ve found useful in this line of research.

figure: deepdream

# Three Speculative Claims

One of the earliest articulations of something approaching modern cell theory were three claims by Schwann in 1839 (Rhoads 2007):

![schwann claims](schwann)

The first two of these claims are likely familiar, persisting in modern cellular theory. The third is likely not familiar, since it turned out to be horribly wrong.

We believe there’s a lot of value in putting oneself out there and articulating a strong version of something you believe may be true, even if might be false like Shwann’s third claim. As a result, we offer three claims about neural networks. They are intended both as empirical claims about the nature of neural networks, and also as normative claims about how it’s useful to understand neural networks.

**Claim 1: Features**
Features are the fundamental unit of neural networks.
They correspond to directions. They can be rigorously studied and understood.

**Claim 2: Circuits**
Features are connected by weights, forming circuits.
These circuits can also be rigorously studied and understood.

**Claim 3: Universality**
Analogous features and circuits form across models and tasks.

These claims are deliberately speculative. But we believe that, if true, they could be a basis for a “zoomed in” field. And we think that there’s enough evidence pointing in the direction of all three of these claims for them to be worth serious consideration and investigation.

In the following sections, we’ll discuss each of these claims individually and present some of the evidence that has led us to believe they might be true.

# Claim 1: Features

Our first claim is that “Features are the fundamental unit of neural networks. They correspond to directions. They can be rigorously studied and understood.”

Part of this claim is trivially true. Directions in activation space (the vector space spanned by neurons) include neurons. Neural networks can obviously be thought of as being composed of neurons, and so there’s an uninteresting sense in which they are at least a unit of neural networks. The interesting part of the claim is that they can, with sufficient effort, be rigorously studied and understood. And as a result, they are in some sense the “right” unit to think about neural networks in terms of.

The research community seems divided on this point. Some researchers treat the existence of meaningful neurons &mdash; such as a curve detector, or floppy ear detector &mdash; as an almost trivial fact. Many others are deeply skeptical and believe that past cases of neurons that seem to track meaningful latent variables are mistaken. This seems like an important disagreement for the interpretability community to resolve.

In light of the existing disagreement, we will try to hold ourselves to a high evidentiary standard in making such claims. This introductory essay will only give an overview of some of the examples we’ve found most compelling, but it will be followed by several deep dives characterizing individual features.

# Example 1: Curve Detectors

In InceptionV1 mixed3b (an early layer layer), we observe a family of neurons we call “curve detectors.” These units responded to curved lines and boundaries with a size on the order of 40 pixels. They are also slightly additionally excited by perpendicular lines along the boundary of the curve. Each unit in the family responds to curves in a different orientation, spanning the space.

There are many other features that respond to curve-like objects including features with a curved sub-component (eg. circles or spirals) or units responding curve like objects (eg. a corner). But curve detectors remain a highly distinctive family.

figure: Curves

Are the curve detectors really curve detectors? We’ve dedicated an entire article to exploring this in depth, but the summary is that we think the evidence is quite strong. We offer six arguments. The first four arguments are based on the properties of the features in isolation:

1. **Feature Visualization**: If we optimize the input to create an image that maximally activates these units we produce curves, as seen above. Note that this is without a generative model prior, so anything in the resulting image must have caused the neuron to fire more. Running the optimization process from different random seeds reliably produces curves.

2. **Dataset examples**: If we look at places where ImageNet images cause these neurons to strongly fire, they are reliably curves in the expected orientation. If we look at examples where the neurons fired moderately, they are generally less perfect curves or curves off orientation.

3. **Synthetic Examples**: Based on our theory that these are curve detectors, we can synthesize artificial curves in varying orientations, curvatures, and backgrounds. The curve detectors fire reliably for curves in the correct orientation.

4. **Tuning Curves**: If we take dataset examples that cause a neuron to fire and rotate them, they gradually stop firing and the curve detectors in the next orientation begins firing. This shows that they detect they are detecting rotated versions of the same thing.

The last two arguments rely on circuits, which we’ll discuss in a little bit. But in brief, they will be:

5. **Feature implementation**: By looking at the circuit constructing the curve detectors, we can literally read a curve detection algorithm off of the weights. We also don’t see anything obviously suggestive of a second case, although there are many smaller weights we don’t understand the role of.

6. **Feature usage**: The downstream clients of curve detectors are features that naturally involve curves (eg. circles, 3d curvature, spirals…). The curve detectors are used by these clients in the way our theory of the two features would predict.

These experiments don’t fully rule out the possibility of some rare secondary case where these neurons also fire. But it seems to us that they establish that curves cause these neurons to fire, that each unit responds to curves at different angular orientations, and that if there are other stimuluses that cause them to fire those are rare or cause much weaker firing.

# Example 2: High-Low Frequency Detectors

Now, you might worry that curve detectors are a special case. Curves are, after all, a very natural visual concept that you might have hoped for a neural network to have. But we can also understand features that would have been very challenging to anticipate in advance.

High-low frequency detectors are units that look for low-frequency patterns on one side of their receptive field, and high-frequency patterns on the other side. We observe them in early vision, again as a family of units with different angular orientations.

figure: HighLow

(Why is this useful? This seems to be a useful heuristic for detecting the boundaries of objects, especially when the background is out of focus. In future articles, we’ll explore how they’re used in the construction of sophisticated boundary detectors.)

We can repeat all the experiments we conducted on curves. This includes creating synthetic examples, since it’s easy to construct images with different frequency patterns on each side. We believe the results strongly support the idea that these really are caused to fire by high-low frequency contrasts, that they are excited by such patterns very generally, and that each unit detects a different angular orientation. If there are other cases where these units fire, they must be rare and cause it to fire more weakly.

# Example 3: Pose-Invariant Dog Head Detector

So far, we’ve looked at low-level visual features. What about high-level features?

Let’s consider this unit which we believe to be a pose-invariant dog detector. As with any neuron, we can create a feature visualization and collect dataset examples. If you look at the feature visualization, the geometry is… not possible, but very informative about what it’s looking for! The dataset examples back this up!

figure: PoseDog

The combination of feature visualization and dataset examples are quite a strong argument. Feature visualization gets at the undelry cause of a neuron firing, while dataset examples get at whether there’s other cases.

Unfortunately, we generally don’t have the ability to test our theory with synthetic inputs &mdash; creating synthetic images of dogs (without using another neural net, which would open up lots of additional analysis challenges) is too difficult.

This leaves us with a strong argument, but perhaps not quite as ironclad as the low-level vision ones. Thankfully, we’ll get some additional tools that give us an alternative pathway for characterizing high-level neurons when we get to analyzing circuits in the next section.

## Polysemantic Neurons

This essay may be giving you an overly rosy picture: perhaps every neuron yields a nice, human-understandable concept if one seriously investigates it?

Alas, this is not the case. Neural networks often contain “polysemantic neurons” which respond to multiple unrelated inputs. The classic example is this neuron, which responds to cat faces, fronts of cars, and cat legs.

figure: Polysemantic

To be clear, this neuron isn’t responding to some commonality of cars and cat faces. Feature visualization shows us that it’s looking for the eyes and whiskers of a cat, for furry legs, and for shiny fronts of cars &mdash; not some subtle shared feature.

We can still study such features, characterizing each different case they fire. But it’s still a major source of difficulty in understanding neural networks. (Our hope is that there might someday be alternative basis for describing neural networks that avoids this.) Despite these challenges, we’ll see in the next section that it’s still possible to reason about circuits with polysemantic neurons, and in fact that circuits will hint at why polysemantic neurons form.

# Claim 2: Circuits

Our second claim is that “Features are connected by weights, forming circuits. These circuits can also be rigorously studied and understood.”

Again, the first part of this claim is trivially true. Of course features are connected by weights &mdash; that’s the definition of a neural network! &mdash; and of course you can consider a subgraph of how those features interact. In fact, these circuits are a really natural thing to turn your attention to once you accept Claim 1: if you can understand features, why wouldn’t you start looking at how they’re wired together?

The remarkable thing is how tractable and meaningful these circuits seem to be as objects of study. When we began looking, we expected to find something quite messy. Instead, we’ve found beautiful rich structures, often with symmetry to them. Once you understand what features they’re connecting together, the individual floating point number weights in your neural network become meaningful!

This is easiest to do by looking at some examples.

## Circuit 1: Curve Detectors

In the previous section, we discussed curve detectors, a family of units detecting curves in different angular orientations. In this section, we’ll explore how curve detectors connect to the rest of the model.

Of course, there’s a long tail of small connections to different parts of early vision. But the primary story seems to be this: At the previous layer, the model has edge detectors and a less sophisticated set of curve detectors. These are combined to create our curve detectors. Then curve detectors are used in the next layer to create 3D geometry and complex shape detectors.

For this introduction, we’ll focus on the interaction of the early curve detectors and our full curve detectors.

figure: CurveCircuit

Let’s focus even more and look at how a single early curve detector connects to sophisticated curve detector in the same orientation.

In this case, our model is implementing a 5x5 convolution, so the weights linking these two neurons are a 5x5 set of weights, which can be positive or negative. A positive weight means that if the earlier neuron fires in that position, it excites the late neuron. Conversely a negative weight would mean that it inhibits it.

What we see are strong positive weights, arranged in the shape of the curve detector. We can think of this as meaning that, at each point along the curve, our curve detector is looking for a “tangent curve” using the earlier curve detector.

figure: Weights1

This is true for every pair of early and full curve detectors in similar orientations. At every point along the curve, it detects the curve in a similar orientation. Similarly, curves in the opposite orientation are inhibitory at every point along the curve.

figure: CurveWeights2

It’s worth reflecting here that we’re looking at neural network weights and they’re meaningful.

And the structure gets richer the closer you look. For example, if you look at an early curve detector and full curve detector in similar, but not exactly the same orientation you can often see it have stronger positive weights on the side of the curve it is more aligned with.

It’s also worth noting how the weights kind of rotate with the orientation of the curve detector. The symmetry of the problem is reflected as a symmetry in the weights. This is what we call an equivariant circuit, a phenomenon we’ll discuss in detail in a later article.

[Read more about the curve detector circuit]

## Circuit 2: Oriented Dog Head Detection

The curve detector circuit is a low-level circuit and only spans two layers. In this section, we’ll discuss a higher-level circuit spanning across four layers. This circuit will also teach us about how neural networks implement sophisticated invariances.

Remember that a huge part of what an ImageNet model has to do is tell apart different animals. In particular, it has to distinguish between a hundred different species of dogs! And so, unsurprisingly, it develops a large number of neurons dedicated to recognizing dog related features, including heads.

Within this “dog recognition” system, one circuit strikes us as particularly interesting: a collection of neurons that handle dog heads facing to the left and dog heads facing to the right. Over three layers, the network maintains two mirrored pathways, detecting analogous units facing to the left and to the right. At each step, these pathways try to inhibit each other, sharpening the contrast. Finally, it creates invariant neurons which respond to both pathways.

figure: DogOrientation

We call this pattern “unioning over cases”. The network separately detects two cases (left and right) and then unions over them to create invariant units.

This circuit is striking because the network could have easily done something much less sophisticated. It could easily create invariant neurons by not caring very much about where the eyes, fur and snout went, and just looking for a jumble of them together. But instead, the network has learned to carve apart the left and right cases and handle the separately. We’re somewhat surprised that gradient descent could learn to do this! <d-footnote id="dog-head" children="To be clear, there are also more direct pathways by which various constituents of heads influence these later head detectors, without going through the left and right pathways" />

But this summary of the circuit is only scratching the surface of what is going on. Ever connection between neurons is a convolution, so we can also look at where an input neuron excites the the next one. And the models tends to be doing what you might have optimistically hoped. For example, consider these “head with neck” units. The head is only detected on the correct side:

figure: OrientedDogHeads

There’s a lot more to say about this circuit, so we’ve dedicated an entire article to analyzing it in depth, including testing our theory of the circuit by editinging the weights.

[Read more about the oriented dog head circuit]

## Circuit 3: Cars in Superposition

In mixed4c, a mid-late layer of InceptionV1, there is a car detecting neuron. Using features from the previous layers, it looks for wheels at the bottom of its convolutional window, and windows at the top.

But then the model does something surprising. Rather than create another car detector at the next layer, it spreads its car feature over a number of neurons that seem to primarily be doing something else &mdash; in particular, dog detectors.

figure: Superposition

This circuit suggests that polysemantic neurons are, in some sense, deliberate. That is, you could imagine a world where the process of detecting cars and dogs were deeply intertwined in the model for some reason, and as a result polysemantic neurons were difficult to avoid. But what we’re seeing here is that the model had a “pure neuron” and then mixed it up with other features.

We call this phenomenon “superposition.”

Why would it do such a thing? We believe superposition allows the model to use fewer neurons, conserving them for more important tasks. As long as cars and dogs don’t co-occur, the model can accurately retrieve the dog feature in a later layer, allowing it to store the feature without dedicating a neuron. <d-footnote id="dimensional" children="Fundamentally, this is a property of the geometry of high-dimensional spaces, which only allow for n orthogonal vectors, but exponentially many almost orthogonal vectors." />

## Claim 3: Universality

Our third claim is “Analogous features and circuits form across models and tasks.”

In some ways, it may not be that surprising once you accept the earlier claims. It’s a widely accepted fact that the first layer of vision models trained on natural images will learn gabor filters. There’s also significant research showing that, in some aggregate sense, neural networks learn representations at hidden layers that share a lot of information. Once you accept that there are meaningful features in later layers, is it surprising that the same features would also form in layers beyond the first one? And once you believe there are analogous features, isn’t it expected that they’d connect in the same ways?

Unlike the first two claims, it wouldn’t be completely fatal to circuits research if this claim turned out to be false. But it does greatly inform what kind of research makes sense. We introduced circuits as a kind of “cellular biology of deep learning.” But imagine a world where every species had cells with a completely different set of organelles and proteins. Would it still make sense to study cells in general, or would we limit ourselves to the narrow study of a few kinds of particularly important species of cells? Similarly, imagine the study of anatomy in a world where every species of animal had a completely unrelated anatomy: would we seriously study anything other than humans and a couple domestic animals?

In this same way, the universality hypothesis determines what form of circuits research makes sense. If it was true in the strongest sense, one could imagine a kind of “periodic table of visual features” which we observe and catalogue across models. On the other hand, if it was mostly false, we would need to focus on a handful of models of particular societal importance and hope they stop changing every year. There might also be in between worlds, where some lessons transfer between models but others need to be learned from scratch.

So, is the universality hypothesis true? Unfortunately, it’s the claim we have the least evidence for. To date, we simply haven’t invested enough in the comparative study of features and circuits to give strong answers.

The main piece of evidence is that we’ve observed curve detectors in a large variety of vision models (including AlexNet, InceptionV1, InceptionV3, and residual networks) and in InceptionV1 trained on Places instead of ImageNet. We’ve also observed them repeatedly form in vanilla conv nets trained from scratch on ImageNet. This is discussed in more depth in the article on curve detectors.

figure: CurvesAcrossModels

Beyond that, we only have anecdotes, where we know that some feature has a similar analogue in another model or two. For example, high-low frequency detectors also exist in [which model?]. Spiral detectors exist in [], [], and []. And so on.

This has led us to believe that a weak version of the universality hypothesis is very likely true &mdash; some higher level features form across models &mdash; but further work will be needed to understand if these are the exception or the rule.

# Interpretability as a Natural Science

The Structure of Scientific Revolutions is a classic text on the history and sociology of science. In it, Kuhn distinguishes between “normal science” in which a scientific community has a paradigm, and “extraordinary science” in which a community lacks a paradigm, either because it never had one or because it was weakened by crisis.

Interpretability seems to match Kuhn’s description of a pre-paradigmatic field to a tee: there isn’t consensus on what the objects of study are, what methods we should use to answer them, or how to evaluate research results. The lack of consensus on evaluation feels particularly challenging for us as a field.

There are two common proposals for how to evaluate work in interpretability, drawing on the standards of adjacent fields. Some researchers, especially those with a deep learning background, want an “interpretability benchmark” which can evaluate how effective an intepretability method is. Other researchers with an HCI background may wish to evaluate interpretability methods through user studies.

But interpretability could borrow from a third paradigm: natural science. In this view, neural networks are an object of empirical investigation, perhaps similar to an organism in biology. Such work would try to make empirical claims about a given network, which could be held to the standard of falsifiability.

Why don’t we see more of this kind of evaluation of work in interpretability and visualization? (Especially given that there’s adjacent ML work which does adopt this frame!) One reason might be that it’s very difficult to make robustly true statements about the behavior of a neural network as a whole. They’re incredibly complicated objects. It’s also hard to formalize exactly what the interesting empirical statements about them would, exactly, be. And so we often get standards of evaluations more targeted about whether an interpretability method is useful rather than whether we’re learning true statements.

Circuits side steps these challenges by focusing on tiny subgraphs of a neural network for which rigorous empirical investigation is tractable. And they’re very much falsifiable: if you understand a circuit, you should be able to predict what will change if you edit the weights. (In fact, once you zoom in enough, statements about the behavior of circuits become questions of mathematical logic.)

# Closing Thoughts

We take it for granted that the microscope is an important scientific instrument. It’s practically a symbol of science. But this wasn’t always the case, and microscopes didn’t initially take off as a scientific tool. In fact, they seem to have languished for around fifty years. The turning point was when Robert Hooke published Micrographia, a collection of drawings of things he’d seen using a microscope, including the first picture of a cell.

My impression is that there is some anxiety in the interpretability community that we aren’t taken very seriously and aren’t very scientific. But the lesson of micrographia is that perhaps this is expected.

Let’s focus on discovering cells.

Interested in the circuits project? Learn how to get involved.
