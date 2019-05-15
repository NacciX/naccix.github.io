import glob
import pandas as pd
#import difflib



from difflib import SequenceMatcher
from heapq import nlargest as _nlargest

def get_close_matches_indexes(word, possibilities, n=3, cutoff=0.6):
    """Use SequenceMatcher to return a list of the indexes of the best 
    "good enough" matches. word is a sequence for which close matches 
    are desired (typically a string).
    possibilities is a list of sequences against which to match word
    (typically a list of strings).
    Optional arg n (default 3) is the maximum number of close matches to
    return.  n must be > 0.
    Optional arg cutoff (default 0.6) is a float in [0, 1].  Possibilities
    that don't score at least that similar to word are ignored.
    """
    
    if not n >  0:
        raise ValueError("n must be > 0: %r" % (n,))
    if not 0.0 <= cutoff <= 1.0:
        raise ValueError("cutoff must be in [0.0, 1.0]: %r" % (cutoff,))
    result = []
    s = SequenceMatcher()
    s.set_seq2(word)
    for idx, x in enumerate(possibilities):
        s.set_seq1(x)
        if s.real_quick_ratio() >= cutoff and \
           s.quick_ratio() >= cutoff and \
           s.ratio() >= cutoff:
            result.append((s.ratio(), idx))
            
    # Move the best scorers to head of list
    result = _nlargest(n, result)
    
    # Strip scores for the best n matches
    return [x for score, x in result]
        
        
        

def cluster_column_names(col_list):
    split_col_list = [i.split('::')[0] for i in col_list]
    cluster_list = [[] for _ in range(len(col_list))]
    print(cluster_list)
    for col in col_list:
        cc = 0
        print(col)
        while cc < len(cluster_list)-1:
            if col in cluster_list[cc]:
                break
                #print(col, cluster_list)
            if cluster_list[cc] == []:
                indices = get_close_matches_indexes(col.split('::')[0], split_col_list, n=len(col), cutoff=0.9)
                cluster_list[cc] = [col_list[i] for i in indices]
                #print(cluster_list[cc])
                break
            cc += 1
    return [i for i in cluster_list if i != []]



def get_cluster_types(survey_cols, c_group):
    unique_vals_in_col = []
    for col in c_group:
        unique_vals_in_col.append(len(survey_cols[col].value_counts()))
    print(set(unique_vals_in_col))
    if unique_vals_in_col[0] == len(c_group):
        print('likely a full ranking, ', col)
    elif unique_vals_in_col[0] == 1:
        print('likely a choose-one, ', col)
    elif unique_vals_in_col[0] > len(survey_cols)//2:
        print('likely an index or user entry col, ', col)
    elif unique_vals_in_col[0] == 5 or unique_vals_in_col[0] == 7:
        print('possibly a scale column, ', col)
        


if __name__ == "__main__":

    
    csv_list = glob.glob('csv/*')
    with open(csv_list[0], 'r') as f:
        line1 = f.readline().strip()
    dma_list = line1.split(',')[2:]
    print(dma_list)


    import json
#from pprint import pprint
    
    with open('d3_voronoi/tv.json') as f:
        data = json.load(f)

    dma_code_list = list(data)

    dma_json_list = [data[i]['Designated Market Area (DMA)'] for i in dma_code_list]
    
    print(dma_json_list)
#pprint(data)
    dma_map = {}
    for place in dma_list:
        print(place)
        match_ids = get_close_matches_indexes(place, dma_json_list, n=len(dma_json_list), cutoff=0.5)
        for i in match_ids:
            print('--- ', dma_json_list[i], dma_code_list[i])
        try:
            dma_map[place] = dma_code_list[match_ids[0]]
        except:
            pass
        
        

    print(dma_map)
    exit(0)
    ### cluster column names
    col_clusters = cluster_column_names(col_list)
    print(col_clusters)


    cluster_types = []
    for c_group in col_clusters:
        cluster_type = get_cluster_types(survey[c_group], c_group)
        cluster_types.append(cluster_type)
    
    
    ### infer column types (mean vs.




