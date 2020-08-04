# DNA alignment visualization

Visualization of algorithms for nucleotide alignment.

The DNA are the fundamental building blocks of a living cell and are made up of nucleotide chain.

There are four kinds of nucleotide, each differentiated from each other by its Nucleobase `guanine`, `adenine`, `cytosine` and `thymine`.

![](images/nucluein.png)

In bioinformatics, a sequence alignment is a way of arranging the sequences of DNA, RNA, or protein to identify regions of 
similarity that may be a consequence of functional, structural, or evolutionary relationships between the sequences.
Aligned sequences of nucleotide or amino acid residues are typically represented as rows within a matrix. Gaps are inserted 
between the residues so that identical or similar characters are aligned in successive columns. Sequence alignments are also used 
for non-biological sequences, such as calculating the distance cost between strings in a natural language or in financial data.

<table border="1" width="100%">
    <tr>
        <td><img src="images/dotplot.png" width="200"></td>
        <td><img src="images/dna-repeats.jpg" width="200"></td>
    </tr>
</table>

# Needleman-Wunsch

Saul B. Needleman and Christian D. Wunsch introduced 1970 an approach to compute the optimal global alignment of two sequences for comparing 
two nucleotide or amino acid sequences.
